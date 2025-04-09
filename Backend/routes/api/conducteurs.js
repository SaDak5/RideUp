const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Conducteur = require("../../models/Conducteur");
const User = require("../../models/User"); // Modèle User

// @route POST api/conducteurs/register
// @desc Register new conducteur
// @access Public
router.post("/register", async (req, res) => {
  const { username, nom, prenom, adresse, numCin, numTelephone, email, password, typeVehicule, role } = req.body;

  // Vérification des champs obligatoires
  if (!username || !email || !password || !typeVehicule || !nom || !prenom || !adresse || !numCin || !numTelephone || !role) {
    return res.status(400).json({ status: "notok", msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    // Vérifier si l'email existe déjà dans la table Users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "notokmail", msg: "Email déjà utilisé" });
    }

    // Créez l'utilisateur dans la table 'users'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,  // rôle de l'utilisateur
      nom,   // nom de l'utilisateur
      prenom, // prénom de l'utilisateur
      adresse, // adresse de l'utilisateur
      numCin,  // numéro de CIN de l'utilisateur
      numTelephone, // numéro de téléphone de l'utilisateur
    });
    
    // Sauvegarde de l'utilisateur
    await newUser.save();

    // Créez le conducteur dans la table 'conducteurs'
    const newConducteur = new Conducteur({
      _id: newUser._id,  // Lier l'utilisateur au conducteur
      username,
      nom,
      prenom,
      adresse,
      numCin,
      password,
      email,
      numTelephone,
      typeVehicule,
      role,  // rôle du conducteur
    });

    // Sauvegarde du conducteur
    await newConducteur.save();
    
    // Générer un token JWT pour l'authentification
    const token = jwt.sign({ id: newUser._id, role: "conducteur" }, config.get("jwtSecret"), { expiresIn: config.get("tokenExpire") });
    
    res.status(200).json({ status: "ok", msg: "Inscription réussie", token, conducteur: newConducteur });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error });
  }
});


// @route GET api/conducteurs/all
// @desc Get all conducteurs
// @access Public
router.get("/all", async (req, res) => {
  try {
    const conducteurs = await Conducteur.find();
    res.status(200).json(conducteurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des conducteurs", error });
  }
});

// @route GET api/conducteurs/:id
// @desc Get conducteur by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const conducteur = await Conducteur.findById(req.params.id);
    if (!conducteur) return res.status(404).json({ message: "Conducteur non trouvé" });
    res.status(200).json(conducteur);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du conducteur", error });
  }
});

// @route PUT api/conducteurs/:id
// @desc Update conducteur by ID
// @access Public
router.put("/:id", async (req, res) => {
  const { username, email, typeVehicule, role } = req.body;

  // Vérification des champs requis
  if (!username || !email || !typeVehicule || !role) {
    return res.status(400).json({ status: "notok", msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    // Mise à jour de l'utilisateur dans la table 'users'
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Mise à jour du conducteur dans la table 'conducteurs'
    const updatedConducteur = await Conducteur.findByIdAndUpdate(req.params.id, { username, email, typeVehicule, role }, { new: true });
    if (!updatedConducteur) return res.status(404).json({ message: "Conducteur non trouvé" });

    res.status(200).json({ message: "Conducteur et utilisateur mis à jour avec succès", updatedConducteur });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du conducteur et de l'utilisateur", error });
  }
});

// @route DELETE api/conducteurs/:id
// @desc Delete conducteur by ID
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    // Supprime le conducteur de la table 'conducteurs'
    const deletedConducteur = await Conducteur.findByIdAndDelete(req.params.id);
    if (!deletedConducteur) return res.status(404).json({ message: "Conducteur non trouvé" });

    // Supprime l'utilisateur de la table 'users'
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ message: "Conducteur et utilisateur supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du conducteur et de l'utilisateur", error });
  }
});

module.exports = router;
