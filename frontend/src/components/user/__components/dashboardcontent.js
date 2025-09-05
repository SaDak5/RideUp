import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Toolbar,
  Avatar,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import GroupIcon from "@mui/icons-material/Group";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import RouteIcon from "@mui/icons-material/Route";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DashboardContent() {
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [refusedCount, setRefusedCount] = useState(0);
  const [topCities, setTopCities] = useState([]);
  const [totalTrajets, setTotalTrajets] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [trajetsStats, setTrajetsStats] = useState({
    total: 0,
    valides: 0,
    rejetes: 0,
    enAttente: 0,
  });

  const [reservationStats, setReservationStats] = useState({
    total: 0,
    enAttente: 0,
    acceptees: 0,
    refusees: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3004/conducteurs/all")
      .then((res) => res.json())
      .then(setConducteurs)
      .catch(console.error);

    fetch("http://localhost:3004/passagers/all")
      .then((res) => res.json())
      .then(setPassagers)
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/accepted")
      .then((res) => res.json())
      .then((data) => setAcceptedCount(data.total_accepted))
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/refused")
      .then((res) => res.json())
      .then((data) => setRefusedCount(data.total_refused))
      .catch(console.error);

    fetch("http://localhost:3004/top-arrivees")
      .then((res) => res.json())
      .then(setTopCities)
      .catch(console.error);

    fetch("http://localhost:3004/trajets/count/all")
      .then((res) => res.json())
      .then((data) => setTotalTrajets(data.total))
      .catch(console.error);
    fetch("http://localhost:3004/reservations/count/all")
      .then((res) => res.json())
      .then((data) => setTotalReservations(data.total))
      .catch(console.error);
    fetch("http://localhost:3004/trajets/count/by-status")
      .then((res) => res.json())
      .then((data) => setTrajetsStats(data))
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/by-status")
      .then((res) => res.json())
      .then((data) => setReservationStats(data))
      .catch(console.error);
  }, []);

  const reservationData = [
    { name: "Acceptées", value: reservationStats.acceptees },
    { name: "Refusées", value: reservationStats.refusees },
    { name: "En attente", value: reservationStats.enAttente },
  ];

  // Ajoutez une couleur pour "En attente"
  const reservationColors = ["#1976d2", "#d32f2f", "#ff9800"];

  const userBreakdown = [
    { name: "Conducteurs", value: conducteurs.length },
    { name: "Passagers", value: passagers.length },
  ];
  // const userColors = ["#90a4ae", "#64b5f6"];

  // const reservationData = [
  //   { name: "Acceptées", value: acceptedCount },
  //   { name: "Refusées", value: refusedCount },
  // ];
  // const reservationColors = ["#1976d2", "#d32f2f"];

  // const cityBreakdown = topCities.map((city) => ({
  //   name: city.ville,
  //   value: city.total,
  // }));
  // const cityColors = ["#4caf50", "#ff9800", "#ff7043", "#9575cd", "#26a69a"];

  // const userColors = ["#43a047", "#fb8c00"];
  const userColors = ["#81c784", "#ffb74d"];
  return (
    <Box component="main" flexGrow={1} p={4}>
      <Toolbar />

      {/* Header avec titre et notifications */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            color: "#333",
          }}
        >
          Tableau de Bord
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4} sx={{ height: "100%", width: "100%" }}>
        {/* Carte Conducteurs */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...statCardSx, height: "100%", width: "272px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: "#43a047", width: 56, height: 56 }}>
                  <DriveEtaIcon fontSize="large" />
                </Avatar>
                <Box textAlign="right">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Conducteurs
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {conducteurs.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte Passagers */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...statCardSx, height: "100%", width: "272px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: "#fb8c00", width: 56, height: 56 }}>
                  <GroupIcon fontSize="large" />
                </Avatar>
                <Box textAlign="right">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Passagers
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {passagers.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte Trajets */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...statCardSx, height: "100%", width: "272px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: "#4caf50", width: 56, height: 56 }}>
                  <RouteIcon fontSize="large" />
                </Avatar>
                <Box textAlign="right">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Trajets
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalTrajets}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte Réservations */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...statCardSx, height: "100%", width: "272px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: "#d32f2f", width: 56, height: 56 }}>
                  <InsertInvitationIcon fontSize="large" />
                </Avatar>
                <Box textAlign="right">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Réservations
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalReservations}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Deuxième ligne avec graphiques */}
      <Grid container spacing={6} mb={4}>
        {/* Graphique de répartition */}
        <Grid item xs={12} md={8} width="550px">
          <Card sx={chartCardSx} width="500px">
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="medium">
                Répartition Conducteurs vs Passagers
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userBreakdown.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={userColors[idx]}
                        stroke="#fff" // Bordure blanche pour meilleure séparation
                        strokeWidth={2} // Épaisseur de la bordure
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [value, ""]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #eee",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Section Statistiques */}
        <Grid item xs={12} md={4} width="550px">
          <Card sx={chartCardSx}>
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="medium">
                Statistiques des Trajets
              </Typography>

              {/* Trajets Acceptés */}
              <Box mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Trajets acceptés
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {/* <CheckCircleIcon color="success" sx={{ mr: 1 }} /> */}
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {trajetsStats.valides}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {trajetsStats.total > 0
                      ? Math.round(
                          (trajetsStats.valides / trajetsStats.total) * 100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>

              {/* Trajets Refusés */}
              <Box mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Trajets refusés
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {/* <CancelIcon color="error" sx={{ mr: 1 }} /> */}
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="error.main"
                    >
                      {trajetsStats.rejetes}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {trajetsStats.total > 0
                      ? Math.round(
                          (trajetsStats.rejetes / trajetsStats.total) * 100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>

              {/* Trajets en Attente */}
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    En attente
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {/* <AccessTimeIcon color="warning" sx={{ mr: 1 }} /> */}
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {trajetsStats.enAttente}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {trajetsStats.total > 0
                      ? Math.round(
                          (trajetsStats.enAttente / trajetsStats.total) * 100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Troisième ligne avec autres graphiques */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} width="550px">
          <Card sx={chartCardSx}>
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="medium">
                Réservations acceptées vs refusées
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={reservationData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="value" barSize={50}>
                    {reservationData.map((entry, idx) => (
                      <Cell key={entry.name} fill={reservationColors[idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} width="550px">
          <Card sx={chartCardSx}>
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="medium">
                Statistiques des Réservations
              </Typography>

              {/* Réservations Acceptées */}
              <Box mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Réservations acceptées
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {reservationStats.acceptees}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {reservationStats.total > 0
                      ? Math.round(
                          (reservationStats.acceptees /
                            reservationStats.total) *
                            100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>

              {/* Réservations Refusées */}
              <Box mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Réservations refusées
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="error.main"
                    >
                      {reservationStats.refusees}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {reservationStats.total > 0
                      ? Math.round(
                          (reservationStats.refusees / reservationStats.total) *
                            100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>

              {/* Réservations en Attente */}
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    En attente
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {reservationStats.enAttente}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography variant="caption" color="textSecondary">
                    {reservationStats.total > 0
                      ? Math.round(
                          (reservationStats.enAttente /
                            reservationStats.total) *
                            100
                        )
                      : 0}
                    % du total
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Styles
const statCardSx = {
  p: 2,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.12)",
  },
  height: "100%",
};

const chartCardSx = {
  p: 3,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
  height: "100%",
};
