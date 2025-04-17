import { Box, CircularProgress } from "@mui/material";
import SearchBar from "../__components/search";
import TrajetCard from "../__components/trajetCard";
import Navbar from "../__components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Trajet = () => {
  const [loading, setLoading] = useState(true);
  const [trajets, setTrajets] = useState([]);
  const [filteredTrajets, setFilteredTrajets] = useState([]);
  const [searchParams, setSearchParams] = useState({
    departure: "",
    arrival: "",
    date: null,
  });

  useEffect(() => {
    fetchTrajets();
  }, []);

  const fetchTrajets = () => {
    axios
      .get("http://localhost:3004/trajets/all")
      .then((response) => {
        setTrajets(response.data);
        setFilteredTrajets(response.data); // Par défaut, tous les trajets sont affichés
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des trajets :", error);
        setLoading(false);
      });
  };

  const handleSearch = ({ departure, arrival, date }) => {
    setSearchParams({ departure, arrival, date });

    const filtered = trajets.filter((trajet) => {
      const matchDeparture = departure
        ? trajet.ville_depart.toLowerCase().includes(departure.toLowerCase())
        : true;
      const matchArrival = arrival
        ? trajet.ville_arrive.toLowerCase().includes(arrival.toLowerCase())
        : true;
      const matchDate = date
        ? new Date(trajet.date_depart).toLocaleDateString("fr-CA") ===
          new Date(date).toLocaleDateString("fr-CA")
        : true;

      return matchDeparture && matchArrival && matchDate;
    });

    setFilteredTrajets(filtered);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar sx={{ bgcolor: "primary.dark" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 3,
          mb: 2,
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          mt: 3,
          px: 3,
          gap: 3,
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress sx={{ color: "primary.main" }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "flex-start",
            }}
          >
            {filteredTrajets.map((trajet) => (
              <TrajetCard
                key={trajet._id}
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
      </Box>
    </Box>
  );
};

export default Trajet;
