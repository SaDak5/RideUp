import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Link,
  Container,
  Paper,
  Avatar
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

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
    role: "conducteur",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
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

    // Vérification de champs vides
    for (let key in formData) {
      if (!formData[key]) {
        setError("Tous les champs sont requis.");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/conducteurs/register",
        formData
      );
      setSuccess("✅ Conducteur inscrit avec succès !");
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
        role: "conducteur",
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.msg || "Erreur interne du serveur");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/conducteur.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ padding: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography variant="h5" textAlign="center" mb={2}>
            Inscription Conducteur
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nom d'utilisateur" name="username" value={formData.username} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Téléphone" name="numTelephone" value={formData.numTelephone} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Mot de passe" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="CIN" name="numCin" value={formData.numCin} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Type de véhicule" name="typeVehicule" value={formData.typeVehicule} onChange={handleChange} margin="normal" required />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              S'inscrire
            </Button>

            <Typography textAlign="center" mt={2}>
              Vous avez déjà un compte ?{" "}
              <Link component={RouterLink} to="/login">
                Se connecter
              </Link>
            </Typography>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterConducteur;
