const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Trajet = require("../../models/trajet");

// afficher Tous les trajets
router.get("/all", async (req, res) => {
  try {
    const trajets = await Trajet.find();
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
  } = req.body;

  try {
    const nouveauTrajet = new Trajet({
      ville_depart,
      ville_arrive,
      place_disponible,
      date_depart,
      heure_depart,
      prix,
      description,
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

module.exports = router;
