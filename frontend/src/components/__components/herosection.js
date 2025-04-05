import React from "react";
import { Box, Typography, Container } from "@mui/material";
import SearchBar from "./searchbar";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 250, md: 250 },
        backgroundImage: `url(https://cdn.blablacar.com/k/a/images/hero_multimodal-f813a10c2882976f.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          py: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: "monospace",
            letterSpacing: ".3rem",
            color: "inherit",
            textAlign: "center",
          }}
        >
          Vous avez vos plans, on a vos bons plans.
        </Typography>

        <Box sx={{ mb: -7 }}>
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
