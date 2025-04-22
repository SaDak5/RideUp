import React from "react";
import { Link } from "react-router-dom"; // Importation du composant Link
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import HeroSection from "./__components/herosection";
import Navbar from "./__components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            mt: 10,
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              width: 550,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 8,
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{
                  height: 300,
                  filter: "brightness(0.9)",
                }}
                image={`${process.env.PUBLIC_URL}/8357614.jpg`} // Image Conducteur
                title="Conducteur"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Conducteur
              </Box>
            </Box>

            <CardContent sx={{ px: 4, py: 3 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                sx={{
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "#1976d2",
                }}
              >
                Vous êtes un conducteur
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  textAlign: "center",
                }}
              >
                Économique et convivial : Partagez vos frais en prenant des
                passagers sympas lors de vos longs trajets en voiture.
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Link to="/registerConducteur" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 4,
                    background: "linear-gradient(to right, #42a5f5, #1976d2)",
                    color: "#fff",
                    "&:hover": {
                      background: "linear-gradient(to right, #1976d2, #0d47a1)",
                    },
                  }}
                >
                  Inscrivez-vous
                </Button>
              </Link>
            </CardActions>
          </Card>

          <Card
            sx={{
              width: 550,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 8,
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{
                  height: 300,
                  filter: "brightness(0.9)",
                }}
                image={`${process.env.PUBLIC_URL}/passager.jpg`} // Image Passager
                title="Passager"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Passager
              </Box>
            </Box>

            <CardContent sx={{ px: 4, py: 3 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                sx={{
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "#1976d2",
                }}
              >
                Vous êtes un passager
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  textAlign: "center",
                }}
              >
                Simple et économique : Réservez facilement votre place en ligne
                et voyagez moins cher, en toute confiance. Même en dernière
                minute !
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Link to="/registerPassager" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 4,
                    background: "linear-gradient(to right, #42a5f5, #1976d2)",
                    color: "#fff",
                    "&:hover": {
                      background: "linear-gradient(to right, #1976d2, #0d47a1)",
                    },
                  }}
                >
                  Inscrivez-vous
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Container>
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
