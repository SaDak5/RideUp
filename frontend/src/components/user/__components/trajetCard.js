import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";

export default function TrajetCard({ trajet }) {
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const [newReser, setNewRerser] = useState({
    trajet_id: trajet._id,
    nb_place: "",
    passager_id: userId,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaces("");
    setSuccessMessage(""); // Reset success message when modal closes
    setErrorMessage(""); // Reset error message when modal closes
  };

  const handleReservation = () => {
    const updatedReservation = { ...newReser, nb_place: parseInt(places, 10) };

    console.log("Réservation effectuée:", updatedReservation);

    axios
      .post("http://localhost:3004/reservations/add", updatedReservation)
      .then(() => {
        setSuccessMessage("Réservation envoyée avec succès !");
        setErrorMessage(""); // Clear any error messages if the request is successful
        setOpen(false);
      })
      .catch((error) => {
        setErrorMessage(
          "Erreur lors de l'ajout de la réservation. Veuillez réessayer."
        );
        setSuccessMessage(""); // Clear any success messages if the request fails
        console.error("Erreur lors de l'ajout :", error);
      });
  };

  return (
    <>
      <Card
        sx={{
          width: 280,
          margin: "auto",
          mt: 4,
          boxShadow: 4,
          borderRadius: 3,
          height: "auto",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {trajet.conducteur_id?.username?.charAt(0).toUpperCase() || ""}
            </Avatar>
          }
          title={
            <Typography fontWeight="bold">
              {trajet.conducteur_id?.username}
            </Typography>
          }
          subheader={new Date(trajet.createdAt).toLocaleDateString("fr-CA")}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2">
            <strong>Départ :</strong> {trajet.ville_depart}
          </Typography>
          <Typography variant="body2">
            <strong>Arrivée :</strong> {trajet.ville_arrive}
          </Typography>
          <Typography variant="body2">
            <strong>Prix :</strong> {trajet.prix} DT
          </Typography>
          <Typography variant="body2">
            <strong>Places dispo :</strong> {trajet.places_disponibles}
          </Typography>
          <Typography variant="body2">
            <strong>Date :</strong>{" "}
            {new Date(trajet.date_depart).toLocaleDateString("fr-CA")} à{" "}
            {trajet.heure_depart}
          </Typography>

          <Box mt={2} textAlign="center">
            <Button
              onClick={handleOpen}
              variant="outlined"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Réserver votre place
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", pt: 3 }}>
          Réserver votre place
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de places à réserver"
            type="number"
            fullWidth
            variant="outlined"
            value={places}
            onChange={(e) => setPlaces(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="error" variant="outlined">
            Annuler
          </Button>
          <Button
            onClick={handleReservation}
            variant="contained"
            disabled={!places}
          >
            Réserver
          </Button>
        </DialogActions>
      </Dialog>

      {/* Affichage de l'alerte si réservation réussie */}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          {successMessage}
        </Alert>
      )}

      {/* Affichage de l'alerte en cas d'erreur */}
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
