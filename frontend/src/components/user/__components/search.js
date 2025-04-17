import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const SearchBar = ({ onSearch }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(null);

  const handleSearch = () => {
    onSearch({ departure, arrival, date }); // Appel de la fonction de recherche avec les critères
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        padding: 1,
        width: "100%",
        maxWidth: "85%",
        height: 60,
        gap: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Adresse de départ"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HouseIcon sx={{ color: "primary.main" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "transparent",
          "& fieldset": {
            borderColor: "#e0e0e0", // Bordure plus claire
            borderWidth: 1.5, // Bordure plus fine et élégante
          },
          "&:hover fieldset": {
            borderColor: "#b0b0b0", // Changement de couleur au survol
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2", // Bordure bleue au focus
          },
        }}
      />
      <TextField
        variant="outlined"
        placeholder="Adresse d'arrivée"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FlagIcon sx={{ color: "primary.main" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "transparent",
          "& fieldset": {
            borderColor: "#e0e0e0",
            borderWidth: 1.5,
          },
          "&:hover fieldset": {
            borderColor: "#b0b0b0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date de départ"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                flex: 1,
                "& fieldset": {
                  borderColor: "#e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: "#b0b0b0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>

      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 2,
          px: 3,
          ml: 1,
          height: "100%",
          fontWeight: "bold",
        }}
      >
        Rechercher
      </Button>
    </Box>
  );
};

export default SearchBar;
