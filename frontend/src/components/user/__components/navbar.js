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

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleHome = () => {
    if (role === "passager") navigate("/passager/trajet");
    else if (role === "conducteur") navigate("/home");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleTrajet = () => {
    if (role === "passager") navigate("/passager/trajet");
    else if (role === "conducteur") navigate("/home");
  };

  const handleReservation = () => {
    if (role === "passager") navigate("/passager/reservation");
    else if (role === "conducteur") navigate("/home");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
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
              aria-label="show 3 new notifications"
              color="inherit"
              sx={{ mr: 3 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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

              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center", color: "primary.main" }}>
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
                <Typography sx={{ textAlign: "center", color: "primary.main" }}>
                  Déconnexion
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
