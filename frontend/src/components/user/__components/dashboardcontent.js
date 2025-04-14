import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Toolbar,
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

export default function DashboardContent() {
  const [users, setUsers] = useState([]);
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  //   const navigate = useNavigate();

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

  //   const handleLogout = () => {
  //     navigate("/");
  //   };

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
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Box flexGrow={1} p={4}>
          <Typography variant="h4" fontWeight="bold" mb={4}>
            Tableau de bord
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: "#e3f2fd" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <PersonIcon /> Utilisateurs: {users.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: "#e8f5e9" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <DriveEtaIcon /> Conducteurs: {conducteurs.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: "#fce4ec" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
              style={{
                width: "80%",
                borderRadius: 12,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
}
