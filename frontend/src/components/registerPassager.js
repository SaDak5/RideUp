import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  Container,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";

function RegisterPassager() {
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

  useEffect(() => {
    // Appliquer l'image de fond globalement sur toute la page
    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/ll.jpg)`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0"; // Supprime les marges par défaut

    // Nettoyage de l'effet
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.height = "";
      document.body.style.margin = "";
    };
  }, []);

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
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Assurez-vous que le Container prend toute la hauteur de la page
        zIndex: 1,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Fond semi-transparent
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <PersonAddAlt1Icon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Inscription Passager
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            margin="normal"
            required
          />
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
            label="Numéro de téléphone"
            name="numTelephone"
            value={formData.numTelephone}
            onChange={handleChange}
            margin="normal"
            required
          />
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
            label="Localisation"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            S'inscrire
          </Button>

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
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPassager;
