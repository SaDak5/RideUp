const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const http = require("http"); // Importation du module http pour le serveur

const socketIo = require("socket.io"); // Importation de socket.io

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const conducteurs = require("./routes/api/conducteurs");
const passagers = require("./routes/api/passagers");
const trajets = require("./routes/api/trajet");
const reservations = require("./routes/api/reservation");

// Initialiser express
const app = express();

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json());

// Activer CORS
app.use(cors());

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

// Création du serveur HTTP avec express
const server = http.createServer(app);

// Initialiser socket.io avec le serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: "*", // Configure l'origine autorisée pour le CORS
    methods: ["GET", "POST"]
  }
});

// Événements de socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  // Exemple d'événement émis par le serveur
  socket.emit("welcome", "Bienvenue sur le serveur en temps réel!");

  // Exemple d'événement reçu du client
  socket.on("message", (data) => {
    console.log("Message reçu:", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Démarrer le serveur
const port = process.env.PORT || 3004;
server.listen(port, () => console.log(`Server running on port ${port}`));
