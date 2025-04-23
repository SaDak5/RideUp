const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TrajetSchema = new mongoose.Schema(
  {
    _id: Number, // Auto-incrémenté
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conducteur",
      required: true,
    },
    statut: {
      type: String,
      enum: ["En attente", "Validé", "Rejeté"],
      default: "En attente",
    },
    // 🆕 Ajout du motif de rejet (optionnel)
    motif_rejet: {
      type: String,
      default: "", // vide s'il n'est pas rejeté
    },
    reservations: [
      {
        type: Number,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);

// Appliquer l'auto-incrémentation sur _id
TrajetSchema.plugin(AutoIncrement, { id: "trajet_seq", inc_field: "_id" });

module.exports = mongoose.model("Trajet", TrajetSchema);
