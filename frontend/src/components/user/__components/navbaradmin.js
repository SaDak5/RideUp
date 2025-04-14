import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

export default function NavbarAdmin({ handleDrawerToggle }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "primary.main",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        {/* Logo */}
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
          href="#"
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

        {/* Spacer pour pousser le contenu à droite */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Notification + Avatar à droite */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="show 3 new notifications"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp">A</Avatar>
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
    </AppBar>
  );
}
