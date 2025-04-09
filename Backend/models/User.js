const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['conducteur', 'passager'],
  }, 
  nom: { type: String, required: true }, 
  prenom: { type: String, required: true }, 
  adresse: { type: String, required: true }, 
  numCin: { type: String, required: true },  
  numTelephone: { type: String, required: true }, 
  dateInscription: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("User", UserSchema);
