const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Reservation = require("../../models/reservation");
const mongoose = require("mongoose");

//afficher tous les reservation
router.get("/all", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      err,
    });
  }
});

//lire by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvé" });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la réservation ",
      err,
    });
  }
});
// ajouter une nouvelle reservation
router.post("/add", async (req, res) => {
  const { trajet_id, nb_place } = req.body;

  try {
    const Trajet = mongoose.model("Trajet");
    const trajet = await Trajet.findById(trajet_id);

    if (!trajet) {
      return res.status(404).json({ message: "Trajet introuvable" });
    }

    if (nb_place > trajet.place_disponible) {
      return res.status(400).json({
        message: `Nombre de places insuffisant. Places disponibles : ${trajet.place_disponible}`,
      });
    }

    const nouvelleRes = new Reservation({
      nb_place,
      statut: "en attente",
      date_reservation: new Date(),
      trajet_id,
    });

    await nouvelleRes.save();

    res.status(201).json({
      message: "Réservation ajoutée avec succès (en attente de validation)",
      reservation: nouvelleRes,
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout de la réservation :", err);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la réservation",
      error: err.message || err,
    });
  }
});

router.put("/accept/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    if (reservation.statut !== "en attente") {
      return res.status(400).json({ message: "Réservation déjà traitée" });
    }

    const Trajet = mongoose.model("Trajet");
    const trajet = await Trajet.findById(reservation.trajet_id);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet associé introuvable" });
    }

    reservation.statut = "accepté";
    await reservation.save();

    trajet.place_disponible -= reservation.nb_place;
    await trajet.save();

    res.status(200).json({ message: "Réservation acceptée", reservation });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'acceptation de la réservation", err });
  }
});

router.put("/refuse/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    if (reservation.statut !== "en attente") {
      return res.status(400).json({ message: "Réservation déjà traitée" });
    }

    const Trajet = mongoose.model("Trajet");
    const trajet = await Trajet.findById(reservation.trajet_id);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet associé introuvable" });
    }

    reservation.statut = "refusé";
    await reservation.save();

    res.status(200).json({ message: "Réservation refusé", reservation });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la refuse de la réservation", err });
  }
});

//supprimer reservation par id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReserv = await Reservation.findByIdAndDelete(id);
    if (!deletedReserv) {
      return res.status(404).json({ message: "Réservation non trouvé" });
    }
    res.status(200).json({ message: "Réservation Supprimé avec succès" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erreur lors de la suppression de la réservation",
      err,
    });
  }
});

// Modifier une réservation en attente
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { nb_place } = req.body;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    if (reservation.statut !== "en attente") {
      return res.status(400).json({
        message: "Impossible de modifier une réservation déjà traitée",
      });
    }

    const Trajet = mongoose.model("Trajet");
    const trajet = await Trajet.findById(reservation.trajet_id);

    if (!trajet) {
      return res.status(404).json({ message: "Trajet introuvable" });
    }

    if (nb_place > trajet.place_disponible) {
      return res.status(400).json({
        message: `Nombre de places demandées supérieur aux places disponibles. Places disponibles : ${trajet.place_disponible}`,
      });
    }

    reservation.nb_place = nb_place;
    await reservation.save();

    res.status(200).json({
      message: "Réservation mise à jour avec succès",
      reservation,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la modification de la réservation",
      err,
    });
  }
});

module.exports = router;
