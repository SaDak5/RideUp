const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReservationSchema = new mongoose.Schema(
  {
    _id: Number,
    nb_place: {
      type: Number,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en attente", "accepté", "refusé"],
      default: "en attente",
    },
    date_reservation: {
      type: Date,
      default: Date.now,
    },
    trajet_id: {
      type: Number,
      ref: "Trajet",
      required: true,
    },
    passager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passager",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReservationSchema.plugin(AutoIncrement, {
  id: "reservation_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("Reservation", ReservationSchema);
