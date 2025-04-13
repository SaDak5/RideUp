import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
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
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3004/users/all")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur users :", err));

    fetch("http://localhost:3004/conducteurs/all")
      .then((res) => res.json())
      .then((data) => setConducteurs(data))
      .catch((err) => console.error("Erreur conducteurs :", err));

    fetch("http://localhost:3004/passagers/all")
      .then((res) => res.json())
      .then((data) => setPassagers(data))
      .catch((err) => console.error("Erreur passagers :", err));
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const pieData = [
    { name: "Conducteurs", value: conducteurs.length },
    { name: "Passagers", value: passagers.length },
  ];

  const barData = [
    { name: "Utilisateurs", total: users.length },
    { name: "Conducteurs", total: conducteurs.length },
    { name: "Passagers", total: passagers.length },
  ];

  const COLORS = ["#87CEEB", "#000080"];

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box
        width="260px"
        bgcolor="#f5f5f5" // Gris clair
        p={3}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box textAlign="center">
          <Avatar
            src={`${process.env.PUBLIC_URL}/logo.png`}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography mt={2} fontWeight="bold" color="#3f51b5">
            Covoiturage Admin
          </Typography>
        </Box>

        <Box textAlign="left" mt={4}>
          <Typography>📞 58039543</Typography>
          <Typography>📍 Rue des fleurs</Typography>
          <Typography>📧 aziz@gmail.com</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            mt: 4,
            bgcolor: "white", // Bouton de déconnexion blanc
            color: "#3f51b5", // Texte bleu
            borderRadius: 2,
            padding: "8px 16px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          Déconnexion
        </Button>
      </Box>

      {/* Main content */}
      <Box flexGrow={1} p={4}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Tableau de bord
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                  <PersonIcon /> Utilisateurs: {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: "#e8f5e9" }}>
              <CardContent>
                <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                  <DriveEtaIcon /> Conducteurs: {conducteurs.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: "#fce4ec" }}>
              <CardContent>
                <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                  <EmojiPeopleIcon /> Passagers: {passagers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4} mt={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Répartition Conducteurs / Passagers
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Statistiques globales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Decorative image */}
        <Box mt={5} textAlign="center">
          <img
            src={`${process.env.PUBLIC_URL}/covoiturage_banner.jpg`}
            alt="Covoiturage"
            style={{ width: "80%", borderRadius: 12, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
