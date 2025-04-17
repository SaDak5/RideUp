import React from "react";
import { Box, Typography } from "@mui/material";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const HeroSection = () => {
  return (
    // <Box
    //   sx={{
    //     position: "relative",
    //     width: "100%",
    //     height: { xs: 250, md: 250 },
    //     backgroundImage: `url(https://cdn.blablacar.com/k/a/images/hero_multimodal-f813a10c2882976f.png)`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     color: "white",
    //     "&::before": {
    //       content: '""',
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //       backgroundColor: "rgba(0, 0, 0, 0.4)",
    //     },
    //   }}
    // >
    //   <Container
    //     maxWidth="lg"
    //     sx={{
    //       position: "relative",
    //       zIndex: 1,
    //       height: "100%",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       py: 3,
    //     }}
    //   >
    //     <Typography
    //       variant="h4"
    //       fontWeight="bold"
    //       sx={{
    //         fontFamily: "monospace",
    //         letterSpacing: ".3rem",
    //         color: "inherit",
    //         textAlign: "center",
    //       }}
    //     >
    //       Vous avez vos plans, on a vos bons plans.
    //     </Typography>

    //     {/* <Box sx={{ mb: -7 }}>
    //       <SearchBar />
    //     </Box> */}
    //   </Container>
    // </Box>
    <Box
      sx={{
        width: "100%",
        height: { xs: 250, md: 300 },
        background: "linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* <DirectionsCarIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} /> */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontFamily: "monospace",
          color: "#1976d2",
          mb: 1,
        }}
      >
        {/* Ensemble sur la route */}
        Un trajet. Deux sourires.
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 500,
          color: "#444",
          maxWidth: 600,
        }}
      >
        Trouvez un trajet ou proposez-en un — rapide, simple, et économique.
      </Typography>
    </Box>
  );
};

export default HeroSection;
