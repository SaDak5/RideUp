import React from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TimerIcon from "@mui/icons-material/Timer";
import VerifiedIcon from "@mui/icons-material/Verified";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 270,
        padding: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Trier par
      </Typography>

      {/* <FormControl component="fieldset">
        <RadioGroup defaultValue="earliest">
          <FormControlLabel
            value="earliest"
            control={<Radio />}
            label="Départ le plus tôt"
            icon={<AccessTimeIcon />}
          />
          <FormControlLabel
            value="cheapest"
            control={<Radio />}
            label="Prix le plus bas"
            icon={<AttachMoneyIcon />}
          />
          <FormControlLabel
            value="closestStart"
            control={<Radio />}
            label="Proche du point de départ"
            icon={<DirectionsWalkIcon />}
          />
          <FormControlLabel
            value="closestEnd"
            control={<Radio />}
            label="Proche du point d’arrivée"
            icon={<DirectionsWalkIcon />}
          />
          <FormControlLabel
            value="shortestRoute"
            control={<Radio />}
            label="Trajet le plus court"
            icon={<TimerIcon />}
          />
        </RadioGroup>
      </FormControl> */}

      {/* <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Heure de départ
      </Typography>
      {["Avant 06:00", "06:00 - 12:00", "12:01 - 18:00", "Après 18:00"].map(
        (label, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox />}
            label={`${label} (${[21, 69, 95, 48][index]})`}
          />
        )
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Confiance et sécurité
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Super Driver (40)"
        icon={<MilitaryTechIcon />}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Profil Vérifié (137)"
        icon={<VerifiedIcon />}
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Services et équipements
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Max. 2 à l’arrière (81)"
        icon={<PeopleIcon />}
      /> */}
    </Box>
  );
};

export default Sidebar;
