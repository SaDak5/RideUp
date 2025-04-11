import { Box } from "@mui/material";
import Navbar from "../__components/navbar";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

const HomeConducteur = () => {
  //   const [loading, setLoading] = useState(true);
  //   const [trajets, setTrajets] = useState([]);
  //   useEffect(() => {
  //     fetchTrajets();
  //   }, []);

  //   const fetchTrajets = () => {
  //     axios
  //       .get("http://localhost:3004/trajets/all")
  //       .then((response) => {
  //         setTrajets(response.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Erreur lors de la récupération des utilisateurs :",
  //           error
  //         );
  //         setLoading(false);
  //       });
  //   };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      {/* Zone Search centrée */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 2,
        }}
      >
        <SearchBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          mt: 2,
          px: 2,
          gap: 2,
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Sidebar />
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              flex: 1,
              pr: 1,
              display: "flex", // Ajouté
              flexWrap: "wrap", // Optionnel : permet de passer à la ligne si l'espace manque
              gap: 2, // Optionnel : espace entre les cartes
            }}
          >
            {trajets.map((trajet) => (
              <TrajetCard
                trajet={{
                  _id: trajet._id,
                  ville_depart: trajet.ville_depart,
                  ville_arrive: trajet.ville_arrive,
                  date_depart: trajet.date_depart,
                  heure_depart: trajet.heure_depart,
                  places_disponibles: trajet.place_disponible,
                  prix: trajet.prix,
                  description: trajet.description,
                  createdAt: trajet.createdAt,
                  conducteur_id: {
                    _id: trajet.conducteur_id._id,
                    username: trajet.conducteur_id.username,
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box> */}
    </Box>
  );
};

export default HomeConducteur;
