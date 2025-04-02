//appel des packages installées
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const users = require("./routes/api/users");
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
app.use("/users", users); // Routes pour les utilisateurs
app.use("/trajets", trajets);
app.use("/reservations", reservations);

// Démarrer le serveur
const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Server running on port ${port}`));
