import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 5,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#d32f2f", mb: 2 }} />
      <Typography variant="h2" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oups ! Page introuvable.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Il semble que la page que vous cherchez n’existe pas ou a été déplacée.
      </Typography>

      {/* <Box
        component="img"
        // src="https://illustrations.popsy.co/gray/web-error.svg"
        alt="Page Not Found"
        sx={{ width: "100%", maxWidth: 400, mb: 4 }}
      /> */}

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{ borderRadius: "20px", px: 4, backgroundColor: "#1976d2" }}
      >
        Retour à l’accueil
      </Button>
    </Container>
  );
}
