const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TrajetSchema = new mongoose.Schema(
  {
    _id: Number,
    ville_depart: {
      type: String,
      required: true,
    },
    ville_arrive: {
      type: String,
      required: true,
    },
    place_disponible: {
      type: Number,
      required: true,
    },
    date_depart: {
      type: Date,
      required: true,
    },
    heure_depart: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    conducteur_id: {
      type: mongoose.Schema.Types.ObjectId, // ID du conducteur
      ref: "Conducteur",
      required: false,
    },
    reservations: [
      {
        type: Number,
        ref: "Reservation",
      },
    ],
  },
  { _id: false } // Désactiver l'ObjectId par défaut
);

// Appliquer l'auto-incrémentation sur _id
TrajetSchema.plugin(AutoIncrement, { id: "trajet_seq", inc_field: "_id" });
module.exports = mongoose.model("Trajet", TrajetSchema);
