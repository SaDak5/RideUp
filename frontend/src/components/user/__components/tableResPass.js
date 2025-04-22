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
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [reservationToDelete, setReservationToDelete] = React.useState(null);

  const handleOpenConfirmDialog = (id) => {
    setReservationToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setOpenModal(false);
  };

  const fetchReservations = async () => {
    const passagerId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `http://localhost:3004/reservations/passager/${passagerId}`
      );
      const sorted = res.data.sort(
        (a, b) => new Date(b.date_reservation) - new Date(a.date_reservation)
      );
      setRows(sorted);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations", error);
    }
  };

  React.useEffect(() => {
    fetchReservations();
  }, []);

  const handleInputChange = (e) => {
    setSelectedReservation({
      ...selectedReservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3004/reservations/update/${selectedReservation.reservation_id}`,
        selectedReservation
      );
      fetchReservations();
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:3004/reservations/delete/${reservationToDelete}`
      )
      .then(() => {
        fetchReservations();
        setOpenConfirmDialog(false);
        setReservationToDelete(null);
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
      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        xs={{ width: "500px", height: "150px" }}
      >
        <Box p={3}>
          <h3>Confirmer la suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette réservation ?</p>
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

      {/* Modal de modification de réservation */}
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
          <h3>Modifier la réservation</h3>
          {selectedReservation && (
            <>
              <TextField
                label="Nombre de places"
                name="nb_place"
                fullWidth
                margin="normal"
                type="number"
                value={selectedReservation.nb_place}
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

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  ID Réservation
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Trajet</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Conducteur</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Places Réservées
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date Départ</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Heure Départ</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Date Réservation
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Statut</TableCell>
                {/* <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.reservation_id}
                  >
                    <TableCell>{row.reservation_id}</TableCell>
                    <TableCell>{`${row.trajet.ville_depart} → ${row.trajet.ville_arrive}`}</TableCell>
                    <TableCell>{row.trajet.conducteur_username}</TableCell>
                    <TableCell>{row.nb_place}</TableCell>
                    <TableCell>{formatDate(row.trajet.date_depart)}</TableCell>
                    <TableCell>{row.trajet.heure_depart}</TableCell>
                    <TableCell>{formatDate(row.date_reservation)}</TableCell>
                    <TableCell>
                      {/* Vérifier le statut avant d'afficher les actions */}
                      {row.statut === "en attente" ? (
                        <>
                          <Tooltip title="Modifier">
                            <IconButton onClick={() => handleOpenModal(row)}>
                              <BorderColorIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              onClick={() =>
                                handleOpenConfirmDialog(row.reservation_id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <span
                          style={{
                            fontWeight: "bold",
                            color:
                              row.statut === "accepté"
                                ? "green"
                                : row.statut === "refusé"
                                  ? "red"
                                  : "black",
                          }}
                        >
                          {row.statut}
                        </span>
                      )}
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
      </Paper>
    </>
  );
}
