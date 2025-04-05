import React from "react";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import PersonIcon from "@mui/icons-material/Person";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HouseIcon from "@mui/icons-material/House";
import FlagIcon from "@mui/icons-material/Flag";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
        padding: 1,
        width: "100%",
        maxWidth: 1000,
        height: 60,
        gap: 1,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Adresse de départ"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HouseIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "#f7f7f7",
          "& fieldset": { border: "none" },
        }}
      />

      <TextField
        variant="outlined"
        placeholder="Adresse d'arrivée"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FlagIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "#f7f7f7",
          "& fieldset": { border: "none" },
        }}
      />

      <TextField
        type="date"
        defaultValue={new Date().toISOString().split("T")[0]} // met la date d'aujourd'hui
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <CalendarTodayIcon color="action" />
        //     </InputAdornment>
        //   ),
        // }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "#f7f7f7",
          "& fieldset": { border: "none" },
        }}
      />

      {/* <TextField
        variant="outlined"
        defaultValue="1 passager"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          borderRadius: 2,
          bgcolor: "#f7f7f7",
          "& fieldset": { border: "none" },
        }}
      /> */}

      <Button
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 2,
          px: 3,
          ml: 1,
          height: "100%",
        }}
      >
        Rechercher
      </Button>
    </Box>
  );
};

export default SearchBar;
