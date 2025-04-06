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
    email: "",
    password: "",
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
        email: "",
        password: "",
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
