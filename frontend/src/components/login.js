import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();  // Utilisation de useNavigate au lieu de useHistory

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'état d'erreur

    // Validation simple
    if (!formData.email || !formData.password) {
      setError("Tous les champs sont requis.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("L'email est invalide.");
      return;
    }

    try {
      // Appel de l'API login
      const response = await fetch("http://localhost:3004/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token dans localStorage (ou un autre stockage sécurisé)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        
        // Afficher les informations dans la console
        console.log("Utilisateur connecté :");
        console.log("ID :", data.id);
        console.log("Rôle :", data.role);
        // Rediriger vers le tableau de bord ou autre page
        navigate("/home");
      } else {
        setError(data.error || "Une erreur s'est produite.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Se connecter
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Typography sx={{ mt: 1 }} justifyContent="center">
            Pas encore de compte ?{" "}
            <Link
              component={RouterLink}
              to="/register"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Inscrivez-vous ici
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
