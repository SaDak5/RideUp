import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  // Grid,
  Link,
  IconButton,
} from "@mui/material";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//pdksg
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

  // Pour faire disparaître le message de succès après 5 secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.username ||
      !formData.nom ||
      !formData.prenom ||
      !formData.adresse ||
      !formData.numTelephone ||
      !formData.email ||
      !formData.password ||
      !formData.numCin ||
      !formData.localisation
    ) {
      setError("Tous les champs sont requis.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("L'email est invalide.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/passagers/register",
        {
          ...formData,
          role: "passager",
        }
      );
      navigate("/login");
      console.log("Inscription réussie", response.data);
      setSuccess("✅ Un nouveau passager a été ajouté avec succès !");
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
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setError(error.response?.data?.msg || "Erreur interne du serveur");
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "50%",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#1565c0",
            transform: "scale(1.1)",
            transition: "0.3s",
          },
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Formulaire à gauche */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 6,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#7a9cc6",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Vous êtes un Passager
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
              />

              <TextField
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Numéro de CIN"
                name="numCin"
                value={formData.numCin}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Numéro de téléphone"
                name="numTelephone"
                value={formData.numTelephone}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Localisation"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, backgroundColor: "#1976d2" }}
            >
              Inscription
            </Button>

            <Typography
              sx={{ mt: 1, textAlign: "center" }}
              justifyContent="center"
            >
              J'ai déjà un compte ?{" "}
              <Link
                component={RouterLink}
                to="/login"
                style={{ color: "primary.main", textDecoration: "underline" }}
              >
                Se connecter
              </Link>
            </Typography>
            {/* Alertes intégrées dans le formulaire */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </form>
        </Box>
      </Box>

      {/* Image à droite */}
      <Box
        sx={{
          flex: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00000",
          px: 2,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/9684913.jpg"}
          alt="illustration"
          style={{ width: "700px", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default RegisterPassager;