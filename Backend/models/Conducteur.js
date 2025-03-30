const mongoose = require("mongoose");
const User = require("./User");

// Définir le schéma Conducteur avec un champ spécifique 'typeVehicule'
const ConducteurSchema = new mongoose.Schema({
  typeVehicule: {
    type: String, // Attribut supplémentaire pour le type de véhicule
    required: true,
  },
  trajets: [
    {
      type: Number, // Liste des trajets créés
      ref: "Trajet",
    },
  ],
});

ConducteurSchema.add(User.schema);

const Conducteur = mongoose.model("Conducteur", ConducteurSchema);
module.exports = Conducteur;
