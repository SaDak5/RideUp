// Import des packages
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const http = require("http"); // Pour le serveur HTTP
const socketIo = require("socket.io"); // Pour Socket.io

// Initialiser express
const app = express();
const server = http.createServer(app); // Créer un serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Permet l'accès depuis le front-end
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
  transports: ["websocket"], // Utiliser WebSocket uniquement, pas de polling
});

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const conducteurs = require("./routes/api/conducteurs");
const passagers = require("./routes/api/passagers");
const trajets = require("./routes/api/trajet");
const reservations = require("./routes/api/reservation")(io);

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json());

// Activer CORS avec une origine spécifique
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connexion à la base de données
const mongo_url = config.get("mongo_url");
mongoose.set("strictQuery", true);
mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Associer les routes aux chemins API
app.use("/users", users);
app.use("/admin", admin);
app.use("/conducteurs", conducteurs);
app.use("/passagers", passagers);
app.use("/trajets", trajets);
app.use("/reservations", reservations);

// Stockage des sockets (optionnel pour le debug)
const userSockets = new Map();

io.on("connection", (socket) => {
  console.log(`Nouvelle connexion: ${socket.id}`);

  // Rejoindre la room utilisateur
  socket.on("join", (userId) => {
    if (!userId) {
      console.error("Erreur: userId manquant");
      return;
    }
    const userIdStr = userId.toString();
    socket.join(userIdStr);
    userSockets.set(userIdStr, socket.id);
    console.log(
      `Utilisateur ${userIdStr} a rejoint sa room (Socket: ${socket.id})`
    );
  });

  // Gestion des nouvelles réservations (passager → conducteur)
  socket.on("newReservation", (data) => {
    console.log("Données de réservation reçues:", data);

    if (!data.conducteur_id) {
      console.error("Erreur: conducteur_id manquant");
      return;
    }

    // Envoi de la notification au conducteur
    io.to(data.conducteur_id.toString()).emit("notification", {
      type: "newReservation",
      message: data.message,
      reservationId: data._id,
      senderId: data.passager_id,
      receiverId: data.conducteur_id,
      createdAt: data.createdAt,
    });
  });

  // Gestion des statuts de réservation (conducteur → passager)
  socket.on("reservationStatus", (data) => {
    console.log("Statut réservation reçu:", data);
    if (!data.receiverId) {
      console.error("Erreur: receiverId manquant");
      return;
    }
    io.to(data.receiverId.toString()).emit("notification", {
      ...data,
      type: "reservationStatus",
      createdAt: new Date().toISOString(),
    });
  });

  // Nettoyage lors de la déconnexion
  socket.on("disconnect", () => {
    console.log(`Déconnexion: ${socket.id}`);
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

// Démarrer le serveur
const port = process.env.PORT || 3004;
server.listen(port, () => console.log(`Server running on port ${port}`));
