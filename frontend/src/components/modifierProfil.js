import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./user/__components/navbar";

const ModifierProfil = () => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfil = async () => {
      const userId = localStorage.getItem("userId");
      const storedRole = localStorage.getItem("role");

      if (!userId || !storedRole) {
        setError("Informations d'identification manquantes.");
        return;
      }

      setRole(storedRole); // enregistre le rôle

      const endpoint =
        storedRole === "passager"
          ? `http://localhost:3004/passagers/${userId}`
          : `http://localhost:3004/conducteurs/${userId}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
          setUtilisateur(data);
        } else {
          setError(data.error || "Erreur lors du chargement du profil.");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur réseau.");
      }
    };

    fetchProfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || !role) {
      setError("Informations d'identification manquantes.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(tn|fr|com)$/;
    if (!emailRegex.test(utilisateur.email)) {
      setError(
        "Email invalide. Il doit contenir un '@' et se terminer par .tn, .fr ou .com."
      );
      setSuccess("");
      return;
    }

    if (utilisateur.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setSuccess("");
      return;
    }

    const endpoint =
      role === "passager"
        ? `http://localhost:3004/passagers/${userId}`
        : `http://localhost:3004/conducteurs/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utilisateur),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Profil mis à jour avec succès !");
        setError("");

        setTimeout(() => {
          setSuccess("");
          navigate("/profil");
        }, 3000);
      } else {
        setError(result.error || "Erreur lors de la mise à jour.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau.");
      setSuccess("");
    }
  };

  if (!utilisateur) {
    return (
      <Container maxWidth="sm">
        <Typography>Chargement...</Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: 3, mt: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Avatar
                  alt="Modifier Profil"
                  src={`${process.env.PUBLIC_URL}/edit.jpg`}
                  sx={{ width: 90, height: 90, marginRight: 1 }}
                />
              </Grid>
              <Grid item>Modifier Profil</Grid>
            </Grid>
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Nom d'utilisateur"
              name="username"
              value={utilisateur.username}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Nom"
              name="nom"
              value={utilisateur.nom}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={utilisateur.prenom}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={utilisateur.email}
              onChange={handleChange}
              fullWidth
              error={error.includes("Email")}
              helperText={error.includes("Email") ? error : ""}
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={utilisateur.password}
              onChange={handleChange}
              fullWidth
              error={error.includes("mot de passe")}
              helperText={error.includes("mot de passe") ? error : ""}
            />
            <TextField
              label="Téléphone"
              name="numTelephone"
              value={utilisateur.numTelephone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Adresse"
              name="adresse"
              value={utilisateur.adresse}
              onChange={handleChange}
              fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enregistrer
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ModifierProfil;
