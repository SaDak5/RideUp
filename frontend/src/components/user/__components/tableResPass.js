import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchReservations = async () => {
      const passagerId = localStorage.getItem("userId");
      try {
        const res = await axios.get(
          `http://localhost:3004/reservations/passager/${passagerId}`
        );
        setRows(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      }
    };

    fetchReservations();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID Réservation</TableCell>
              <TableCell>Trajet</TableCell>
              <TableCell>Conducteur</TableCell>
              <TableCell>Places Réservées</TableCell>
              <TableCell>Date Départ</TableCell>
              <TableCell>Heure Départ</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date Réservation</TableCell>
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
                  <TableCell
                    sx={{
                      color:
                        row.statut === "accepté"
                          ? "#4caf50"
                          : row.statut === "refusé"
                          ? "#f44336"
                          : "#ff9800",
                      fontWeight: "bold",
                    }}
                  >
                    {row.statut}
                  </TableCell>

                  <TableCell>{formatDate(row.date_reservation)}</TableCell>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
