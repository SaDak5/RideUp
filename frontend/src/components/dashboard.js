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
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  People as PeopleIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
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

  const COLORS = ["#1976d2", "#90caf9"];

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <Box
        width="260px"
        bgcolor="rgba(255, 255, 255, 0.92)"
        p={3}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Box textAlign="center">
            <Avatar
              src="https://mui.com/static/logo.png"
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
            <Typography mt={2} fontWeight="bold" color="#3f51b5">
              Covoiturage Admin
            </Typography>
          </Box>

          <List component="nav" sx={{ mt: 4 }}>
            <ListItem button onClick={() => setOpenMenu(!openMenu)}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
              {openMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }} onClick={() => navigate("/")}>
                  <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/listeUtilisateurs")}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Utilisateurs" />
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/passagers/trajets/all")}
                >
                  <ListItemIcon>
                    <MapIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trajets" />
                </ListItem>
              </List>
            </Collapse>
          </List>
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
            mt: 2,
            bgcolor: "white",
            color: "#3f51b5",
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

      {/* Main Content */}
      <Box
        flexGrow={1}
        p={4}
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.85)", overflowY: "auto" }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Tableau de bord
        </Typography>

        {/* ✅ Cards Professionnelles */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: "#ffffff",
                transition: "0.3s",
                "&:hover": { boxShadow: 8 },
              }}
            >
              <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56, mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Utilisateurs
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {users.length}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: "#ffffff",
                transition: "0.3s",
                "&:hover": { boxShadow: 8 },
              }}
            >
              <Avatar sx={{ bgcolor: "#43a047", width: 56, height: 56, mr: 2 }}>
                <DriveEtaIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Conducteurs
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {conducteurs.length}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: "#ffffff",
                transition: "0.3s",
                "&:hover": { boxShadow: 8 },
              }}
            >
              <Avatar sx={{ bgcolor: "#fb8c00", width: 56, height: 56, mr: 2 }}>
                <EmojiPeopleIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Passagers
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {passagers.length}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Répartition Conducteurs / Passagers
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Statistiques générales
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
