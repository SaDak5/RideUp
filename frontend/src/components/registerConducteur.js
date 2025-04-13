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

function RegisterConducteur() {
  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    adresse: "",
    numTelephone: "",
    email: "",
    password: "",
    numCin: "",
    typeVehicule: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Faire disparaître le message de succès après 5 secondes
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
      !formData.typeVehicule
    ) {
      setError("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/conducteurs/register",
        {
          ...formData,
          role: "conducteur",
        }
      );

      console.log("Inscription réussie", response.data);
      setSuccess("✅ Un nouveau conducteur a été ajouté avec succès !");

      setFormData({
        username: "",
        nom: "",
        prenom: "",
        adresse: "",
        numTelephone: "",
        email: "",
        password: "",
        numCin: "",
        typeVehicule: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setError(error.response?.data?.msg || "Erreur interne du serveur");
    }
  };

  return (
    <>
      {/* Appliquez l'image de fond sur le body */}
      <style>
        {`
          body {
            background-image: url(${process.env.PUBLIC_URL}ll.jpg);
            background-size: cover;
            background-position: center;
            height: 100vh;
            margin: 0;
          }
        `}
      </style>

      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={10} sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
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
            Inscription Conducteur
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
              label="Type de véhicule"
              name="typeVehicule"
              value={formData.typeVehicule}
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
    </>
  );
}

export default RegisterConducteur;
