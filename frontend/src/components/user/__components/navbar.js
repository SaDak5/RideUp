import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box as MuiBox } from "@mui/material";
import { io } from "socket.io-client";
// test push
function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const socket = io("http://localhost:3004");
  const [notifications, setNotifications] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [anchorNotif, setAnchorNotif] = React.useState(null);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("userId");

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [depart, setDepart] = React.useState("");
  const [arrivee, setArrivee] = React.useState("");
  const [date, setDate] = React.useState("");
  const [heure, setHeure] = React.useState("");
  const [prix, setPrix] = React.useState("");
  const [places, setPlaces] = React.useState("");
  const socketRef = React.useRef(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifMenu = (event) => {
    setAnchorNotif(event.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorNotif(null);
  };

  const handleHome = () => {
    if (role === "passager") navigate("/passager/trajet");
    else if (role === "conducteur") navigate("/conducteur/home");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleTrajet = () => {
    if (role === "passager") navigate("/passager/trajet");
    else if (role === "conducteur") navigate("/conducteur/home");
  };

  const handleReservation = () => {
    if (role === "passager") navigate("/passager/reservation");
    else if (role === "conducteur") navigate("/conducteur/reservation");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trajetData = {
      ville_depart: depart,
      ville_arrive: arrivee,
      date_depart: date,
      heure_depart: heure,
      prix: parseFloat(prix),
      place_disponible: parseInt(places),
      conducteur_id: user_id,
    };

    try {
      const response = await fetch("http://localhost:3004/trajets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trajetData),
      });

      if (response.ok) {
        console.log("Trajet publié !");
        handleCloseModal();
        setDepart("");
        setArrivee("");
        setDate("");
        setHeure("");
        setPrix("");
        setPlaces("");
        window.location.reload();
        navigate("/conducteur/home");
      } else {
        console.error("Erreur lors de la publication du trajet.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  React.useEffect(() => {
    socketRef.current = io("http://localhost:3004", {
      transports: ["websocket"],
      withCredentials: true,
    });

    const socket = socketRef.current;
    const userId = localStorage.getItem("userId");

    socket.emit("join", userId);

    const handleNotification = (data) => {
      console.log("Nouvelle notification reçue:", data);

      const newNotification = {
        ...data,
        id: Date.now().toString(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Sauvegarde dans localStorage
      const updatedNotifications = [newNotification, ...notifications];
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "primary.main",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <DirectionsCarFilledIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: "70px",
                color: "primary.main",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              RideUp
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Home"
                onClick={handleHome}
                sx={{
                  my: 2,
                  color: "primary.main",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 800,
                  mr: 2,
                }}
              >
                Home
              </Button>
              <Button
                key="Trajet"
                onClick={handleTrajet}
                sx={{
                  my: 2,
                  color: "primary.main",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 800,
                  mr: 2,
                }}
              >
                Trajet
              </Button>
              <Button
                key="Reservation"
                onClick={handleReservation}
                sx={{
                  my: 2,
                  color: "primary.main",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 800,
                  mr: 2,
                }}
              >
                Réservation
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {role === "conducteur" && (
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  variant="text"
                  onClick={handleOpenModal}
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: 600,
                    mr: 2,
                  }}
                >
                  Publier un trajet
                </Button>
              )}
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                sx={{ mr: 3 }}
                onClick={handleOpenNotifMenu}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={anchorNotif}
                open={Boolean(anchorNotif)}
                onClose={handleCloseNotifMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    maxWidth: 350,
                    width: "100%",
                    maxHeight: 400,
                    overflowY: "auto",
                    boxShadow: 4,
                    borderRadius: 2,
                    p: 1,
                  },
                }}
              >
                {notifications.length === 0 ? (
                  <MenuItem disabled>Aucune notification</MenuItem>
                ) : (
                  notifications.map((notif) => (
                    <MenuItem
                      key={notif._id || notif.createdAt}
                      onClick={() => {
                        const updatedNotifications = notifications.map((n) =>
                          n._id === notif._id || n.createdAt === notif.createdAt
                            ? { ...n, read: true }
                            : n
                        );
                        setNotifications(updatedNotifications);
                        setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
                        localStorage.setItem(
                          "notifications",
                          JSON.stringify(updatedNotifications)
                        );
                        handleCloseNotifMenu();
                        navigate(`/${role}/reservation`);
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 0.5,
                        px: 2,
                        py: 1.5,
                        backgroundColor: notif.read ? "white" : "#f0f4ff",
                        borderBottom: "1px solid #eee",
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#e3ebff",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={notif.read ? "normal" : "bold"}
                        color="text.primary"
                        sx={{ wordBreak: "break-word" }}
                      >
                        {notif.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notif.createdAt).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </MenuItem>
                  ))
                )}
              </Menu>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">
                    {username ? username.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
      <MenuItem key={setting} onClick={handleCloseUserMenu}>
        <Typography
          sx={{ textAlign: "center", color: "primary.main" }}
        >
          {setting}
        </Typography>
      </MenuItem>
    ))} */}

                <MenuItem
                  key="Profile"
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/profil");
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", color: "primary.main" }}
                  >
                    Profile
                  </Typography>
                </MenuItem>

                <MenuItem
                  key="Déconnexion"
                  onClick={() => {
                    handleLogout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center", color: "primary.main" }}
                  >
                    Déconnexion
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-trajet-title"
        aria-describedby="modal-trajet-description"
      >
        <MuiBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <h3 id="modal-trajet-title" variant="h6" component="h2" gutterBottom>
            Publier un nouveau trajet
          </h3>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Ville de départ"
              fullWidth
              margin="normal"
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
            />
            <TextField
              label="Ville d'arrivée"
              fullWidth
              margin="normal"
              value={arrivee}
              onChange={(e) => setArrivee(e.target.value)}
            />
            <TextField
              label="Date de départ"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Heure de départ"
              type="time"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
            />
            <TextField
              label="Prix"
              type="number"
              fullWidth
              margin="normal"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
            <TextField
              label="Places disponibles"
              type="number"
              fullWidth
              margin="normal"
              value={places}
              onChange={(e) => setPlaces(e.target.value)}
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
              <Button type="submit" variant="outlined" color="primary">
                Publier
              </Button>
            </Box>
          </form>
        </MuiBox>
      </Modal>
    </>
  );
}
export default Navbar;
