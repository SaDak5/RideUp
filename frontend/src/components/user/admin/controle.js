import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import NavbarAdmin from "../__components/navbaradmin";
import Sidebar from "../__components/sidebaradmin";

const drawerWidth = 240;

const ControlerTrajet = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trajets, setTrajets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [motif, setMotif] = useState("");
  const [selectedTrajetId, setSelectedTrajetId] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchTrajets = () => {
    axios
      .get("http://localhost:3004/trajets/all")
      .then((res) => setTrajets(res.data))
      .catch((err) => console.error("Erreur API :", err));
  };

  useEffect(() => {
    fetchTrajets();
  }, []);

  const handleValider = (id) => {
    axios
      .put(`http://localhost:3004/trajets/accepter/${id}`)
      .then(() => fetchTrajets())
      .catch((err) => console.error("Erreur lors de la validation :", err));
  };

  const handleOpenDialog = (id) => {
    setSelectedTrajetId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMotif("");
    setSelectedTrajetId(null);
  };

  const handleRefuser = () => {
    if (!motif.trim()) {
      alert("Veuillez saisir un motif de rejet.");
      return;
    }

    axios
      .put(`http://localhost:3004/trajets/refuser/${selectedTrajetId}`, {
        motif_rejet: motif,
      })
      .then(() => {
        fetchTrajets();
        handleCloseDialog();
      })
      .catch((err) => console.error("Erreur lors du refus :", err));
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case "Validé":
        return "green";
      case "Rejeté":
        return "red";
      default:
        return "orange";
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarAdmin handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 9,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Contrôler les Trajets
        </Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 480 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Départ</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Arrivée</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Conducteur</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Heure</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Prix</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Statut</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trajets.map((trajet) => (
                  <TableRow hover key={trajet._id}>
                    <TableCell>{trajet.ville_depart}</TableCell>
                    <TableCell>{trajet.ville_arrive}</TableCell>
                    <TableCell>{trajet.conducteur_id?.username}</TableCell>
                    <TableCell>
                      {new Date(trajet.date_depart).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>{trajet.heure_depart}</TableCell>
                    <TableCell>{trajet.prix} TND</TableCell>
                    <TableCell align="center">
                      {trajet.statut === "En attente" ? (
                        <>
                          <Tooltip title="Valider">
                            <IconButton
                              sx={{ color: "green" }}
                              onClick={() => handleValider(trajet._id)}
                            >
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Rejeter">
                            <IconButton
                              sx={{ color: "red" }}
                              onClick={() => handleOpenDialog(trajet._id)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <strong
                          style={{ color: getStatutColor(trajet.statut) }}
                        >
                          {trajet.statut}
                        </strong>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* MODALE DE REJET */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Motif de Rejet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Pourquoi refuser ce trajet ?"
            fullWidth
            multiline
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleRefuser} variant="contained" color="error">
            Rejeter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ControlerTrajet;
