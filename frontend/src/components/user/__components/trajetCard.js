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
import {
  LocationOn,
  CalendarToday,
  AccessTime,
  AttachMoney,
  AirlineSeatReclineNormal,
} from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { blue, red, green, grey } from "@mui/material/colors";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("http://localhost:3004", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function TrajetCard({ trajet }) {
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const isAvailable = trajet.places_disponibles > 0;
  // const socket = io("http://localhost:3004", {
  //   transports: ["websocket"], // ou ["websocket", "polling"]
  // });

  const [newReser, setNewRerser] = useState({
    trajet_id: trajet._id,
    nb_place: "",
    passager_id: userId,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaces("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleReservation = () => {
    const updatedReservation = { ...newReser, nb_place: parseInt(places, 10) };

    axios
      .post("http://localhost:3004/reservations/add", updatedReservation)
      .then(() => {
        setSuccessMessage("Réservation envoyée avec succès !");
        setErrorMessage("");
        setOpen(false);

        socket.emit("newReservation", {
          // _id: response.data._id, // ID de la réservation
          passager_id: localStorage.getItem("userId"),
          conducteur_id: trajet.conducteur_id._id, // Accès à l'ID via ._id
          message: `${username} a réservé ${places} place(s)`,
          createdAt: new Date().toISOString(),
        });
      })

      .catch((error) => {
        setErrorMessage("Erreur lors de la réservation.");
        setSuccessMessage("");
        console.error("Erreur lors de l'ajout :", error);
      });
  };

  return (
    <>
      <Card
        sx={{
          height: "340px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Effet d'élévation plus prononcé
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[700], fontWeight: "bold" }}>
              {trajet.conducteur_id?.username?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h6" fontWeight="bold">
              {trajet.conducteur_id?.username}
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="gray">
              Publié le {new Date(trajet.createdAt).toLocaleDateString("fr-CA")}
            </Typography>
          }
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="body2"
            display="flex"
            alignItems="center"
            fontSize="17px"
          >
            <LocationOn sx={{ mr: 1, color: blue[300] }} />
            <strong>
              {trajet.ville_depart} → {trajet.ville_arrive}
            </strong>
            &nbsp;
          </Typography>

          <Typography variant="body2" display="flex" alignItems="center">
            <AttachMoney sx={{ mr: 1, color: "#e65100" }} />
            <strong>Prix :</strong> {trajet.prix} DT
          </Typography>

          <Typography variant="body2" display="flex" alignItems="center">
            <AirlineSeatReclineNormal sx={{ mr: 1, color: "#8e24aa" }} />
            <strong>Places disponible :</strong> {trajet.places_disponibles}
          </Typography>

          <Typography variant="body2" display="flex" alignItems="center">
            <CalendarToday sx={{ mr: 1, color: blue[500] }} />
            <strong>Date :</strong>{" "}
            {new Date(trajet.date_depart).toLocaleDateString("fr-CA")}
          </Typography>

          <Typography variant="body2" display="flex" alignItems="center">
            <AccessTime sx={{ mr: 1, color: green[300] }} />
            <strong>Heure :</strong> {trajet.heure_depart}
          </Typography>

          <Box mt={2} textAlign="center">
            <Button
              onClick={handleOpen}
              variant="outlined"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                py: 1.2,
                backgroundColor: "#fdfdfd",
                borderColor: "primary.main",
                color: "primary.main",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  borderColor: "#b0b0b0",
                },
                "&:disabled": {
                  backgroundColor: "#f3f3f3",
                  color: "#999",
                  borderColor: "#e0e0e0",
                },
              }}
              disabled={!isAvailable}
            >
              Réserver votre place
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
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

      {/* Alertes */}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: green[500],
            color: "white",
          }}
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: red[700],
            color: "white",
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
