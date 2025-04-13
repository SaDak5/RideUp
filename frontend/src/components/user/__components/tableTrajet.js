import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";

export default function TableTrajet({ refresh }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTrajet, setSelectedTrajet] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [trajetToDelete, setTrajetToDelete] = React.useState(null);

  const handleOpenConfirmDialog = (id) => {
    setTrajetToDelete(id);
    setOpenConfirmDialog(true);
  };

  const fetchTrajets = async () => {
    const conducteurId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `http://localhost:3004/trajets/conducteur/${conducteurId}`
      );
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRows(sorted);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations", error);
    }
  };

  React.useEffect(() => {
    fetchTrajets();
  }, []);

  const handleOpenModal = (trajet) => {
    setSelectedTrajet(trajet);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTrajet(null);
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setSelectedTrajet({
      ...selectedTrajet,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3004/trajets/update/${selectedTrajet._id}`,
        selectedTrajet
      );
      fetchTrajets();
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleConfirmDelete = (id) => {
    axios
      .delete(`http://localhost:3004/trajets/delete/${trajetToDelete}`)
      .then(() => {
        fetchTrajets();
        setOpenConfirmDialog(false);
        setTrajetToDelete(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        xs={{ width: "500px", height: "150px" }}
      >
        <Box p={3} xs={{ width: "500px", height: "150px" }}>
          <h3>Confirmer la suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer ce trajet ?</p>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={() => setOpenConfirmDialog(false)}
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="outlined"
            >
              Supprimer
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID Trajet</strong>
                </TableCell>
                <TableCell>
                  <strong>Trajet</strong>
                </TableCell>
                <TableCell>
                  <strong>Places</strong>
                </TableCell>
                <TableCell>
                  <strong>Date Départ</strong>
                </TableCell>
                <TableCell>
                  <strong>Heure</strong>
                </TableCell>
                <TableCell>
                  <strong>Prix</strong>
                </TableCell>
                <TableCell>
                  <strong>Création</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{`${row.ville_depart} → ${row.ville_arrive}`}</TableCell>
                    <TableCell>{row.place_disponible}</TableCell>
                    <TableCell>{formatDate(row.date_depart)}</TableCell>
                    <TableCell>{row.heure_depart}</TableCell>
                    <TableCell>{row.prix}</TableCell>
                    <TableCell>{formatDate(row.createdAt)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenModal(row)}>
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenConfirmDialog(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />

        {/* Modal de modification */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <h3 xs={{}}>Modifier le trajet</h3>
            {selectedTrajet && (
              <>
                <TextField
                  label="Ville Départ"
                  name="ville_depart"
                  fullWidth
                  margin="normal"
                  value={selectedTrajet.ville_depart}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Ville Arrivée"
                  name="ville_arrive"
                  fullWidth
                  margin="normal"
                  value={selectedTrajet.ville_arrive}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Date de départ"
                  type="date"
                  name="date_depart"
                  fullWidth
                  margin="normal"
                  value={selectedTrajet.date_depart}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Places"
                  name="place_disponible"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={selectedTrajet.place_disponible}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Heure Départ"
                  name="heure_depart"
                  fullWidth
                  margin="normal"
                  value={selectedTrajet.heure_depart}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Prix"
                  name="prix"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={selectedTrajet.prix}
                  onChange={handleInputChange}
                />
                <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCloseModal}
                  >
                    Annuler
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleUpdate}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Paper>
    </>
  );
}
