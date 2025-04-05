import React from "react";
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
            gap: 6, // Espace entre les deux cartes
            mt: 10, // Marge entre HeroSection et les cartes
            flexWrap: "wrap",
          }}
        >
          <Card sx={{ width: 550, boxShadow: 6 }}>
            <CardMedia
              sx={{
                height: 450, // Ajuster la hauteur pour permettre à l'image d'être plus grande
                objectFit: "cover", // L'image couvre l'espace sans se déformer
                width: "100%", // Prend toute la largeur disponible
              }}
              image={`${process.env.PUBLIC_URL}/8357614.jpg`}
              title="Conducteur"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
              >
                Vous êtes un conducteur
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Économique et convival : Partagez vos frais en prenant des
                passagers sympas lors de vos longs trajets en voiture.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="large"
                sx={{
                  fontSize: "1rem", // Taille de la police
                  fontWeight: "bold", // Texte en gras
                }}
              >
                Inscrivez-vous
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: 550, boxShadow: 6 }}>
            <CardMedia
              sx={{
                height: 450, // Ajuster la hauteur pour permettre à l'image d'être plus grande
                objectFit: "cover", // L'image couvre l'espace sans se déformer
                width: "100%", // Prend toute la largeur disponible
              }}
              image={`${process.env.PUBLIC_URL}/passager.jpg`}
              title="Passager"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
              >
                Vous êtes un passager
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Simple et économique : Réserver facilement votre place en ligne
                et voyagez moins cher, en toute confiance. Même en dernière
                minute !
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="large"
                sx={{
                  fontSize: "1rem", // Taille de la police
                  fontWeight: "bold", // Texte en gras
                }}
              >
                Inscrivez-vous
              </Button>
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
