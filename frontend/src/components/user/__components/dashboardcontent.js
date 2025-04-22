import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Toolbar,
  IconButton,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DashboardContent() {
  const [users, setUsers] = useState([]);
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [refusedCount, setRefusedCount] = useState(0);
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/users/all")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);

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
  }, []);

  const userBreakdown = [
    { name: "Conducteurs", value: conducteurs.length },
    { name: "Passagers", value: passagers.length },
  ];
  const userColors = ["#90a4ae", "#64b5f6"];

  const reservationData = [
    { name: "Acceptées", value: acceptedCount },
    { name: "Refusées", value: refusedCount },
  ];
  const reservationColors = ["#1976d2", "#d32f2f"];

  const cityBreakdown = topCities.map((city) => ({
    name: city.ville,
    value: city.total,
  }));
  const cityColors = ["#4caf50", "#ff9800", "#ff7043", "#9575cd", "#26a69a"];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Couche semi-transparente */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        sx={{ backgroundColor: "rgba(255,255,255,0.7)", zIndex: 1 }}
      />

      {/* Icône de notification */}
      <Box
        position="absolute"
        top={20}
        right={30}
        zIndex={3}
      >
        <IconButton color="primary">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Contenu principal */}
      <Box component="main" flexGrow={1} p={4} position="relative" zIndex={2}>
        <Toolbar />
        <Typography
          variant="h1"
          fontWeight="bold"
          mb={4}
          sx={{
            textAlign: "left",
            fontFamily: "'Roboto', sans-serif",
            letterSpacing: "2px",
            color: "#333",
            textShadow: "2px 2px 8px rgba(42, 122, 234, 0.1)",
            fontSize: "2.5rem",
          }}
        >
          Dashboard Administrateur
        </Typography>

        {/* Cartes des totaux */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <AccountCircleIcon fontSize="large" sx={{ mr: 1, color: "#1976d2" }} />
                <Typography variant="h6">Utilisateurs: {users.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <DriveEtaIcon fontSize="large" sx={{ mr: 1, color: "#43a047" }} />
                <Typography variant="h6">Conducteurs: {conducteurs.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <GroupIcon fontSize="large" sx={{ mr: 1, color: "#fb8c00" }} />
                <Typography variant="h6">Passagers: {passagers.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <CheckCircleIcon fontSize="large" sx={{ mr: 1, color: "#4caf50" }} />
                <Typography variant="h6" fontWeight="bold">
                  Réservations Acceptées: {acceptedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <CancelIcon fontSize="large" sx={{ mr: 1, color: "#d32f2f" }} />
                <Typography variant="h6" fontWeight="bold" color="error">
                  Réservations Refusées: {refusedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Graphiques */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={chartCardSx}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Répartition Conducteurs / Passagers
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
                      <Cell key={entry.name} fill={userColors[idx]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, ""]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={chartCardSx}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Réservations acceptées vs refusées
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reservationData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
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
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={chartCardSx}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Villes d'arrivée les plus fréquentes
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cityBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {cityBreakdown.map((entry, idx) => (
                      <Cell key={entry.name} fill={cityColors[idx % cityColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, ""]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Styles
const cardSx = {
  p: 2,
  bgcolor: "#fff",
  display: "flex",
  alignItems: "center",
  borderRadius: 3,
  boxShadow: 4,
};
const cardContentSx = {
  display: "flex",
  alignItems: "center",
  p: 0,
};
const chartCardSx = {
  p: 2,
  borderRadius: 3,
  boxShadow: 4,
};
