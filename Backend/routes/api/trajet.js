const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Trajet = require("../../models/trajet");

// afficher Tous les trajets
router.get("/all", async (req, res) => {
  try {
    const trajets = await Trajet.find()
      .populate({
        path: "conducteur_id",
        select: "username",
      })
      .sort({ createdAt: -1 });
    res.status(200).json(trajets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des trajets", err });
  }
});

// ajouter un nouveau trajet
router.post("/add", async (req, res) => {
  const {
    ville_depart,
    ville_arrive,
    place_disponible,
    date_depart,
    heure_depart,
    prix,
    description,
    conducteur_id,
  } = req.body;
  console.log("BODY:", req.body);
  try {
    const nouveauTrajet = new Trajet({
      ville_depart,
      ville_arrive,
      place_disponible,
      date_depart,
      heure_depart,
      prix,
      description,
      conducteur_id,
    });

    await nouveauTrajet.save();

    res.status(201).json({
      message: "Trajet ajouté avec succès",
      trajet: nouveauTrajet,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du trajet", err });
  }
});

// lire trajet par id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const trajet = await Trajet.findById(id);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet non trouvé" });
    }
    res.status(200).json(trajet);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du trajet ",
      err,
    });
  }
});

// mettre a jour un trajet
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    ville_depart,
    ville_arrive,
    place_disponible,
    date_depart,
    heure_depart,
    prix,
    description,
  } = req.body;

  try {
    const updatedTrajet = await Trajet.findByIdAndUpdate(
      id,
      {
        ville_depart,
        ville_arrive,
        place_disponible,
        date_depart,
        heure_depart,
        prix,
        description,
      },
      { new: true }
    );
    if (!updatedTrajet) {
      return res.status(404).json({ message: "Trajet non trouvé" });
    }
    res
      .status(200)
      .json({ message: "Trajet mis à jour avec succès", updatedTrajet });
  } catch (error) {
    console.log("Erreur lors de la mise à jour:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du trajet", error });
  }
});

//supprimer trajet par id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrajet = await Trajet.findByIdAndDelete(id);
    if (!deletedTrajet) {
      return res.status(404).json({ message: "Trajet non trouvé" });
    }
    res.status(200).json({ message: "Trajet Supprimé avec succès" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du trajet", err });
  }
});





// Lister tous les trajets d'un conducteur (avec tous les attributs)
router.get("/conducteur/:conducteurId", async (req, res) => {
  const { conducteurId } = req.params;

  try {
    const trajets = await Trajet.find({ conducteur_id: conducteurId })
      .populate({
        path: "conducteur_id",
        select: "username",
      })
      .sort({ createdAt: -1 });

    if (trajets.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun trajet trouvé pour ce conducteur" });
    }

    res.status(200).json(trajets);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des trajets par conducteur:",
      err
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des trajets",
      error: err,
    });
  }
});



// Lister les villes d'arrivée les plus fréquentes
router.get("/villes-frequentes", async (req, res) => {
  try {
    const villesFrequentes = await Trajet.aggregate([
      {
        $group: {
          _id: "$ville_arrive",  // Grouper par la ville d'arrivée
          count: { $sum: 1 },     // Compter le nombre d'occurrences pour chaque ville
        },
      },
      {
        $sort: { count: -1 },      // Trier par le nombre d'occurrences (du plus fréquent au moins fréquent)
      },
      {
        $limit: 2,                // Limiter à 2 résultats les plus fréquents
      },
    ]);

    if (villesFrequentes.length === 0) {
      return res.status(404).json({ message: "Aucune ville d'arrivée trouvée" });
    }

    res.status(200).json(villesFrequentes);
  } catch (err) {
    console.error("Erreur lors de la récupération des villes fréquentes:", err);
    res.status(500).json({ message: "Erreur lors de la récupération des villes d'arrivée", error: err });
  }
});

module.exports = router;
