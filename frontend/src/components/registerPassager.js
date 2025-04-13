import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Link,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const RegisterPassager = () => {
  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    adresse: "",
    numTelephone: "",
    email: "",
    password: "",
    numCin: "",
    localisation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/ll.jpg)`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";
    return () => {
      document.body.style = "";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      username,
      nom,
      prenom,
      adresse,
      numTelephone,
      email,
      password,
      numCin,
      localisation,
    } = formData;

    if (
      !username ||
      !nom ||
      !prenom ||
      !adresse ||
      !numTelephone ||
      !email ||
      !password ||
      !numCin ||
      !localisation
    ) {
      setError("Tous les champs sont requis.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("L'email est invalide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/passagers/register",
        { ...formData, role: "passager" }
      );
      setSuccess("✅ Inscription réussie !");
      setFormData({
        username: "",
        nom: "",
        prenom: "",
        adresse: "",
        numTelephone: "",
        email: "",
        password: "",
        numCin: "",
        localisation: "",
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.msg || "Erreur serveur");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      {/* Formulaire à gauche */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 6,
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="#1976d2" mt={1}>
              Inscription Passager
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
              <TextField fullWidth label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="Numéro de CIN" name="numCin" value={formData.numCin} onChange={handleChange} required />
              <TextField fullWidth label="Téléphone" name="numTelephone" value={formData.numTelephone} onChange={handleChange} required />
            </Box>
            <TextField fullWidth label="Nom d'utilisateur" name="username" value={formData.username} onChange={handleChange} required margin="normal" />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
              <TextField fullWidth label="Localisation" name="localisation" value={formData.localisation} onChange={handleChange} required />
            </Box>
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required margin="normal" />
            <TextField fullWidth label="Mot de passe" name="password" type="password" value={formData.password} onChange={handleChange} required margin="normal" />
            <Button variant="contained" fullWidth type="submit" sx={{ mt: 3, backgroundColor: "#1976d2" }}>
              S'inscrire
            </Button>

            <Typography textAlign="center" mt={2}>
              Déjà un compte ?{" "}
              <Link component={RouterLink} to="/login" underline="hover" color="primary">
                Se connecter
              </Link>
            </Typography>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          </form>
        </Box>
      </Box>

      {/* Image à droite */}
      <Box
        sx={{
          flex: 1.2,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f6f9",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/register-illustration.png`}
          alt="Illustration"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default RegisterPassager;
