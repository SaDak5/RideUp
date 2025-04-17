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
  Typography,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour la recherche
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Appliquer l'image de fond au body
    document.body.style.backgroundImage = "url('/path/to/users.avif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Charger les utilisateurs
    axios
      .get("http://localhost:3004/users/all")
      .then((res) => {
        setUtilisateurs(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      });

    // Nettoyer l'effet lors de la destruction du composant
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  const handleModifier = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      username: user.username,
      email: user.email,
      password: "", // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
      role: user.role,
    });
    setOpenModal(true);
  };

  const handleSupprimer = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      axios
        .delete(`http://localhost:3004/users/${id}`)
        .then(() => {
          setUtilisateurs(utilisateurs.filter((u) => u._id !== id));
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression :", err);
        });
    }
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:3004/users/${selectedUser._id}`, updatedUser)
      .then((res) => {
        const { updatedUser } = res.data;
        setUtilisateurs(
          utilisateurs.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setOpenModal(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
      });
  };

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = utilisateurs.filter((user) => {
    const searchString = searchTerm.toLowerCase();
    return (
      user.nom.toLowerCase().includes(searchString) ||
      user.prenom.toLowerCase().includes(searchString) ||
      user.numCin.toLowerCase().includes(searchString)
    );
  });

  return (
    <Box p={4} sx={{ backgroundColor: "#fafafa" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Liste des utilisateurs
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <TextField
          variant="outlined"
          label="Rechercher"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour du terme de recherche
          sx={{ maxWidth: "300px" }}
        />
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: "8px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nom</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prénom</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rôle</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Adresse</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CIN</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Téléphone</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Inscription</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.adresse}</TableCell>
                  <TableCell>{user.numCin}</TableCell>
                  <TableCell>{user.numTelephone}</TableCell>
                  <TableCell>
                    {new Date(user.dateInscription).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Modifier">
                      <IconButton color="primary" onClick={() => handleModifier(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton color="error" onClick={() => handleSupprimer(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de modification */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            value={updatedUser.username}
            onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={updatedUser.password}
            onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rôle"
            value={updatedUser.role}
            onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListeUtilisateurs;
