import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./user/__components/navbar";

const Profil = () => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUtilisateur = async () => {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");

      if (!userId || !role) {
        setError("Informations d'identification manquantes.");
        return;
      }

      const endpoint =
        role === "passager"
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

    fetchUtilisateur();
  }, []);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!utilisateur) {
    return (
      <Container maxWidth="sm">
        <Typography>Chargement...</Typography>
      </Container>
    );
  }

  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/profile.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{ padding: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <Typography variant="h4" gutterBottom textAlign="center">
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item>
                  <Avatar
                    alt="Avatar utilisateur"
                    src={`${process.env.PUBLIC_URL}/profil.jpg`}
                    sx={{ width: 90, height: 90 }}
                  />
                </Grid>
                <Grid item>
                  Profil {role === "conducteur" ? "Conducteur" : "Passager"}
                </Grid>
              </Grid>
            </Typography>

            <Box display="flex" justifyContent="center">
              <TableContainer
                sx={{ width: 500, border: "1px solid #ccc", borderRadius: 2 }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell
                        sx={{ width: "40%", fontWeight: "bold" }}
                        align="right"
                      >
                        Nom d'utilisateur
                      </TableCell>
                      <TableCell>{utilisateur.username}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Nom
                      </TableCell>
                      <TableCell>{utilisateur.nom}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Prénom
                      </TableCell>
                      <TableCell>{utilisateur.prenom}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Email
                      </TableCell>
                      <TableCell>{utilisateur.email}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Mot de passe
                      </TableCell>
                      <TableCell>{"********"}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Téléphone
                      </TableCell>
                      <TableCell>{utilisateur.numTelephone}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Adresse
                      </TableCell>
                      <TableCell>{utilisateur.adresse}</TableCell>
                    </TableRow>
                    <TableRow sx={{ height: 56 }}>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Numéro de cin
                      </TableCell>
                      <TableCell>
                        {utilisateur.numCin || "Non spécifié"}
                      </TableCell>
                    </TableRow>
                    {role === "conducteur" && (
                      <TableRow sx={{ height: 56 }}>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          Véhicule
                        </TableCell>
                        <TableCell>
                          {utilisateur.typeVehicule || "Non spécifié"}
                        </TableCell>
                      </TableRow>
                    )}
                    {role === "passager" && (
                      <TableRow sx={{ height: 56 }}>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          Localisation
                        </TableCell>
                        <TableCell>
                          {utilisateur.localisation || "Non spécifié"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, display: "block", margin: "0 auto" }}
              onClick={() => navigate("/modifierProfil")}
            >
              Modifier
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Profil;
