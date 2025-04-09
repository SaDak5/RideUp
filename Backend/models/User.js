const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // rôle de l'utilisateur (conducteur, administrateur, etc.)
  nom: { type: String, required: true },  // nom de l'utilisateur
  prenom: { type: String, required: true },  // prénom de l'utilisateur
  adresse: { type: String, required: true }, // adresse de l'utilisateur
  numCin: { type: String, required: true },  // CIN de l'utilisateur
  numTelephone: { type: String, required: true }, // téléphone de l'utilisateur
  dateInscription: { type: Date, default: Date.now }, // date d'inscription
});

module.exports = mongoose.model("User", UserSchema);
