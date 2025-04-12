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
  Tooltip,
  //   Modal,
  //   Box,
  //   TextField,
  //   Button,
  //   Dialog,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

export default function TableReservationConducteur() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const fetchTrajets = async () => {
    const conducteurId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `http://localhost:3004/reservations/conducteur/${conducteurId}`
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

  const handleAction = async (action, id) => {
    try {
      await axios.put(`http://localhost:3004/reservations/${action}/${id}`);
      fetchTrajets();
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de la réservation ${id}`,
        error
      );
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID Reservation</strong>
                </TableCell>
                <TableCell>
                  <strong>Nom Du Passager</strong>
                </TableCell>
                <TableCell>
                  <strong>Email du Passager</strong>
                </TableCell>
                <TableCell>
                  <strong>N° Téléphone</strong>
                </TableCell>
                <TableCell>
                  <strong>Trajet</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre de Place</strong>
                </TableCell>
                <TableCell>
                  <strong>Date Trajet</strong>
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
                  <TableRow hover key={row.reservation_id}>
                    <TableCell>{row.reservation_id}</TableCell>
                    <TableCell>{row.passager.username}</TableCell>
                    <TableCell>{row.passager.email}</TableCell>
                    <TableCell>{row.passager.numTelephone}</TableCell>
                    <TableCell>{`${row.trajet.ville_depart} → ${row.trajet.ville_arrive}`}</TableCell>
                    <TableCell>{row.nb_place}</TableCell>
                    <TableCell>{formatDate(row.trajet.date_depart)}</TableCell>
                    <TableCell>
                      {row.statut === "en attente" ? (
                        <>
                          <Tooltip title="Refuser">
                            <IconButton sx={{ color: "red" }}>
                              <ClearIcon
                                onClick={() =>
                                  handleAction("refuse", row.reservation_id)
                                }
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Accepter">
                            <IconButton sx={{ color: "green" }}>
                              <CheckIcon
                                onClick={() =>
                                  handleAction("accept", row.reservation_id)
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <strong
                          style={{
                            color: row.statut === "accepté" ? "green" : "red",
                          }}
                        >
                          {row.statut === "accepté" ? "Accepté" : "Refusé"}
                        </strong>
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
