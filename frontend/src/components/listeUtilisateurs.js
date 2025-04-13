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
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3004/users/all")
      .then((res) => {
        setUtilisateurs(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      });
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

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Liste des utilisateurs
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Nom</strong></TableCell>
              <TableCell><strong>Prénom</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Rôle</strong></TableCell>
              <TableCell><strong>Adresse</strong></TableCell>
              <TableCell><strong>CIN</strong></TableCell>
              <TableCell><strong>Téléphone</strong></TableCell>
              <TableCell><strong>Inscription</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurs.length > 0 ? (
              utilisateurs.map((user) => (
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
                      <IconButton
                        color="primary"
                        onClick={() => handleModifier(user)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton
                        color="error"
                        onClick={() => handleSupprimer(user._id)}
                      >
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
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, username: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={updatedUser.password}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, password: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rôle"
            value={updatedUser.role}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
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
