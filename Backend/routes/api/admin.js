const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");

const User = require("../../models/User");

// @route POST api/admins/register
// @desc Register new admin
// @access Public

router.post("/register", async (req, res) => {
  const { username, nom, prenom, adresse, numCin, numTelephone, email, password, role } = req.body;

  // Vérification des champs obligatoires
  if (!username || !email || !password || !nom || !prenom || !adresse || !numCin || !numTelephone || !role) {
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
      nom,
      prenom,
      adresse,
      numCin,
      numTelephone,
      email,
      password: hashedPassword, // Assurez-vous que le mot de passe est hashé avant de le sauvegarder
      role: "admin" // Le rôle doit être "admin"
    });

    await newUser.save();

    // Créez l'administrateur dans la table 'admins'
    const newAdmin = new Admin({
      _id: newUser._id,  // Lier l'utilisateur au rôle admin
      username,
      nom,
      prenom,
      adresse,
      numCin,
      numTelephone,
      email,
      password: hashedPassword, // Ajoutez ici le mot de passe hashé
      role: "admin" // Le rôle de l'admin
    });

    await newAdmin.save();

    // Générer un token JWT pour l'authentification
    const token = jwt.sign({ id: newUser._id, role: "admin" }, config.get("jwtSecret"), { expiresIn: config.get("tokenExpire") });

    res.status(200).json({ status: "ok", msg: "Inscription réussie", token, admin: newAdmin });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Erreur lors de l'enregistrement de l'admin", error: error.message });
  }
});

// @route POST api/admins/login
// @desc Login admin
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  Admin.findOne({ email }).then((admin) => {
    if (!admin || admin.role !== "admin") return res.status(401).json({ error: "Admin not found" });

    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

      jwt.sign(
        { id: admin.id, role: admin.role },
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpire") },
        (err, token) => {
          if (err) return res.status(500).json({ error: "Internal server error" });
          res.status(200).json({ token, role: admin.role });
        }
      );
    });
  }).catch(() => res.status(500).json({ error: "Internal server error" }));
});

// @route GET api/admins/all
// @desc Get all admins
// @access Public
router.get("/all", async (req, res) => {
  try {
    const admins = await Admin.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des administrateurs", error });
  }
});

// @route GET api/admins/:id
// @desc Get admin by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin || admin.role !== "admin") return res.status(404).json({ message: "Administrateur non trouvé" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'administrateur", error });
  }
});

// @route PUT api/admins/:id
// @desc Update admin by ID
// @access Public
router.put("/:id", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: req.params.id, role: "admin" },
      req.body,
      { new: true }
    );
    if (!updatedAdmin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.status(200).json({ message: "Administrateur mis à jour avec succès", updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'administrateur", error });
  }
});

// @route DELETE api/admins/:id
// @desc Delete admin by ID
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findOneAndDelete({ _id: req.params.id, role: "admin" });
    if (!deletedAdmin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.status(200).json({ message: "Administrateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'administrateur", error });
  }
});

module.exports = router;
