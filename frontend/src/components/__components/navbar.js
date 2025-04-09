import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Link } from "react-router-dom";

function Navbar() {
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
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: "70px" }}
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
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RideUp
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to="/registerPassager" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: 600,
                  mr: 2,
                }}
              >
                Passager? Recherchez un trajet
              </Button>
            </Link>

            <Link to="/registerConducteur" style={{ textDecoration: "none" }}>
              {" "}
              <Button
                variant="text"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: 600,
                  mr: 2,
                }}
              >
                Conducteur? Proposez un trajet
              </Button>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: 600,
                  mr: 2,
                }}
              >
                Connexion
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
