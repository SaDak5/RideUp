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
      type: Boolean,
      default: false,
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
  },
  { _id: false }
);

ReservationSchema.plugin(AutoIncrement, {
  id: "reservation_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("Reservation", ReservationSchema);
