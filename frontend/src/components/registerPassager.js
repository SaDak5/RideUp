import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
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

  // Pour faire disparaître le message de succès après 5 secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer); // nettoie le timer si le composant est démonté
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation côté client
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

    // Validation de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("L'email est invalide.");
      return;
    }

    // Validation du mot de passe (exemple simple de validation de longueur)
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
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
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