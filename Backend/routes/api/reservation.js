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
  const { trajet_id, nb_place, passager_id } = req.body;

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
      passager_id,
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

// afficher les réservations par passager_id
router.get("/passager/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Reservation.deleteMany({ trajet_id: null });
    const reservations = await Reservation.find({ passager_id: id })
      .populate({
        path: "trajet_id",
        populate: {
          path: "conducteur_id",
          model: "Conducteur",
          populate: {
            path: "_id",
            model: "User",
          },
        },
      })
      .sort({ date_reservation: -1 });

    if (!reservations.length) {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce passager" });
    }

    const filtered = reservations.filter((res) => res.trajet_id);

    // Pour simplifier le résultat (juste ce qu’on veut retourner)
    const formatted = reservations
      .filter((res) => res.trajet_id)
      .map((res) => ({
        reservation_id: res._id,
        nb_place: res.nb_place,
        statut: res.statut,
        date_reservation: res.date_reservation,
        trajet: {
          ville_depart: res.trajet_id?.ville_depart || "Inconnu",
          ville_arrive: res.trajet_id?.ville_arrive || "Inconnu",
          date_depart: res.trajet_id?.date_depart || "Non défini",
          heure_depart: res.trajet_id?.heure_depart || "Non défini",
          conducteur_username:
            res.trajet_id?.conducteur_id?.username || "Non trouvé",
        },
      }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: err.message || err,
    });
  }
});

// afficher les réservations par conducteur_id avec info passager
router.get("/conducteur/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const Trajet = mongoose.model("Trajet");

    // Récupérer tous les trajets appartenant au conducteur
    const trajets = await Trajet.find({ conducteur_id: id });

    const trajetIds = trajets.map((t) => t._id);
    if (!trajetIds.length) {
      return res
        .status(404)
        .json({ message: "Aucun trajet trouvé pour ce conducteur" });
    }

    // Trouver toutes les réservations liées à ces trajets
    const reservations = await Reservation.find({
      trajet_id: { $in: trajetIds },
    })
      .populate("passager_id") // Pour obtenir les infos du passager
      .populate("trajet_id") // Pour obtenir les infos du trajet si besoin
      .sort({ date_reservation: -1 });

    if (!reservations.length) {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce conducteur" });
    }

    // Formater les données de manière lisible
    const formatted = reservations.map((res) => ({
      reservation_id: res._id,
      nb_place: res.nb_place,
      statut: res.statut,
      date_reservation: res.date_reservation,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      passager: {
        id: res.passager_id?._id,
        nom: res.passager_id?.nom || "Non spécifié",
        prenom: res.passager_id?.prenom || "Non spécifié",
        email: res.passager_id?.email || "Non spécifié",
        username: res.passager_id?.username || "Non spécifié",
        numTelephone: res.passager_id?.numTelephone || "Non spécifié",
      },
      trajet: {
        ville_depart: res.trajet_id?.ville_depart,
        ville_arrive: res.trajet_id?.ville_arrive,
        date_depart: res.trajet_id?.date_depart,
        heure_depart: res.trajet_id?.heure_depart,
      },
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations du conducteur",
      error: err.message || err,
    });
  }
});

//////////////////////////////////////////
router.get("/count/accepted", async (req, res) => {
  try {
    const countAccepted = await Reservation.countDocuments({ statut: "accepté" });
    res.status(200).json({ total_accepted: countAccepted });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors du comptage des réservations acceptées",
      error: err.message || err,
    });
  }
});

router.get("/count/refused", async (req, res) => {
  try {
    const countRefused = await Reservation.countDocuments({ statut: "refusé" });
    res.status(200).json({ total_refused: countRefused });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors du comptage des réservations refusées",
      error: err.message || err,
    });
  }
});
router.get("/count/all", async (req, res) => {
  try {
    const counts = await Promise.all([
      Reservation.countDocuments({ statut: "en attente" }),
      Reservation.countDocuments({ statut: "accepté" }),
      Reservation.countDocuments({ statut: "refusé" }),
    ]);

    res.status(200).json({
      en_attente: counts[0],
      accepté: counts[1],
      refusé: counts[2],
    });
  } catch (err) {
    console.error("Erreur lors du comptage global des réservations :", err);
    res.status(500).json({
      message: "Erreur lors du comptage global des réservations",
      error: err.message || err,
    });
  }
});


module.exports = router;
