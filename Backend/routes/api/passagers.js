const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Passager = require("../../models/Passager");
const User = require("../../models/User");

// @route POST api/passagers/
// @desc Ajouter un nouveau passager + créer son User
// @access Public
router.post("/register", async (req, res) => {
  const {
    username,
    nom,
    prenom,
    adresse,
    numCin,
    numTelephone,
    email,
    password,
    localisation,
    role,
  } = req.body;

  // Vérifie que tous les champs sont remplis
  if (
    !username || !nom || !prenom || !adresse || !numCin || !numTelephone ||
    !email || !password || !localisation || !role
  ) {
    return res.status(400).json({
      status: "notok",
      msg: "Veuillez remplir tous les champs obligatoires",
    });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "notok",
        msg: "Ce nom d'utilisateur existe déjà",
      });
    }

    // 🔐 Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crée le user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      nom,
      prenom,
      adresse,
      numCin,
      numTelephone,
      role,
    });

    const savedUser = await newUser.save();

    // Crée le passager avec le même ID
    const newPassager = new Passager({
      id: savedUser.id, // 🔁 pour garder la même ID que le user
      username,
      email,
      nom,
      prenom,
      adresse,
      numCin,
      numTelephone,
      password,
      localisation,
      role,
    });

    const savedPassager = await newPassager.save();

    res.status(201).json({
      message: "Passager et utilisateur ajoutés avec succès",
      passager: savedPassager,
    });
  } catch (error) {
    res.status(500).json({
      status: "notok",
      message: "Erreur lors de l'ajout du passager et de l'utilisateur",
      error: error.message,
    });
  }
});

// @route GET api/passagers/all
// @desc Get all passagers
// @access Public
router.get("/all", async (req, res) => {
  try {
    const passagers = await Passager.find();
    res.status(200).json(passagers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des passagers", error });
  }
});

// @route GET api/passagers/:id
// @desc Get passager by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const passager = await Passager.findById(req.params.id);
    if (!passager) return res.status(404).json({ message: "Passager non trouvé" });
    res.status(200).json(passager);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du passager", error });
  }
});

// @route PUT api/passagers/:id
// @desc Update passager by ID
// @access Public
router.put("/:id", async (req, res) => {
  const { username, email, localisation, role } = req.body;

  // Vérification des champs requis
  if (!username || !email || !localisation || !role) {
    return res.status(400).json({ status: "notok", msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    // Mise à jour de l'utilisateur dans la table 'users'
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Mise à jour du passager dans la table 'passagers'
    const updatedPassager = await Passager.findByIdAndUpdate(req.params.id, { username, email, localisation, role }, { new: true });
    if (!updatedPassager) return res.status(404).json({ message: "Passager non trouvé" });

    res.status(200).json({ message: "Passager et utilisateur mis à jour avec succès", updatedPassager });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du passager et de l'utilisateur", error });
  }
});

// @route DELETE api/passagers/:id
// @desc Delete passager by ID
// @access Public

router.delete("/:id", async (req, res) => {
  try {
    // Supprimer le passager de la table 'passagers'
    const deletedPassager = await Passager.findByIdAndDelete(req.params.id);
    if (!deletedPassager) {
      return res.status(404).json({ message: "Passager non trouvé" });
    }

    // Supprimer l'utilisateur de la table 'users' (lié via l'ID commun)
    const deletedUser = await User.findByIdAndDelete(req.params.id); // ID du passager et de l'utilisateur sont les mêmes
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Réponse réussie si les deux ont été supprimés
    res.status(200).json({ message: "Passager et utilisateur supprimés avec succès" });
  } catch (error) {
    // Gérer les erreurs possibles
    res.status(500).json({
      message: "Erreur lors de la suppression du passager et de l'utilisateur",
      error: error.message,
    });
  }
});


module.exports = router;
