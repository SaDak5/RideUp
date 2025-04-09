const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");

// @route POST api/admins/register
// @desc Register new admin
// @access Public
router.post("/register", (req, res) => {
  const {
    username,
    nom,
    prenom,
    adresse,
    numCin,
    numTelephone,
    email,
    password,
  } = req.body;

  // Vérification des champs requis
  if (!username || !nom || !prenom || !adresse || !numCin || !numTelephone || !email || !password) {
    return res.status(400).send({ status: "notok", msg: "Please enter all required data" });
  }

  Admin.findOne({ email }).then((admin) => {
    if (admin) {
      return res.status(400).send({ status: "notokmail", msg: "Email already exists" });
    }

    const newAdmin = new Admin({
      username,
      nom,
      prenom,
      adresse,
      numCin,
      numTelephone,
      email,
      password,
      role: "admin", // Assurer que le rôle est "admin"
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send({ status: "error", msg: "Internal server error" });

      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) return res.status(500).send({ status: "error", msg: "Internal server error" });

        newAdmin.password = hash;
        newAdmin.save().then((admin) => {
          jwt.sign(
            { id: admin.id },
            config.get("jwtSecret"),
            { expiresIn: config.get("tokenExpire") },
            (err, token) => {
              if (err) return res.status(500).send({ status: "error", msg: "Internal server error" });
              res.status(200).send({ status: "ok", msg: "Successfully registered", token, admin });
            }
          );
        }).catch(() => res.status(500).send({ status: "error", msg: "Internal server error" }));
      });
    });
  }).catch(() => res.status(500).send({ status: "error", msg: "Internal server error" }));
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
