const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Passager = require("../../models/Passager");
const User = require("../../models/User"); // Assurez-vous que vous avez ce modèle User

// @route POST api/passagers/register
// @desc Register new passager
// @access Public
router.post("/register", async (req, res) => {
  const { username, email, password, localisation, role } = req.body;

  if (!username || !email || !password || !localisation || !role) {
    return res.status(400).json({ status: "notok", msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    // Vérifiez si l'email existe déjà dans la table Users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "notokmail", msg: "Email déjà utilisé" });
    }

    // Créez d'abord l'utilisateur dans la table 'users'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role, 
    });
    
  
    await newUser.save();


    const newPassager = new Passager({
      _id: newUser._id,  // aandhom nefs el id 
      username,
      email,
      password: hashedPassword, 
      localisation,
      role, 
    });

    
    await newPassager.save();
    
    // Génération du token JWT
    const token = jwt.sign({ id: newUser._id, role: "passager" }, config.get("jwtSecret"), { expiresIn: config.get("tokenExpire") });
    
    res.status(200).json({ status: "ok", msg: "Inscription réussie", token, passager: newPassager });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error });
  }
});

// @route POST api/passagers/login
// @desc Login passager
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez fournir un email et un mot de passe" });
  }

  try {
    const passager = await Passager.findOne({ email });
    if (!passager) return res.status(401).json({ error: "Passager non trouvé" });

    const isMatch = await bcrypt.compare(password, passager.password);
    if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: passager.id, role: "passager" }, config.get("jwtSecret"), { expiresIn: config.get("tokenExpire") });
    res.status(200).json({ token, role: passager.role });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
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

  if (!username || !email || !localisation || !role) {
    return res.status(400).json({ status: "notok", msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

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
   
    const deletedPassager = await Passager.findByIdAndDelete(req.params.id);
    if (!deletedPassager) return res.status(404).json({ message: "Passager non trouvé" });

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ message: "Passager et utilisateur supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du passager et de l'utilisateur", error });
  }
});

module.exports = router;
