import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "@mui/material";

export default function TrajetCard({ trajet }) {
  return (
    <Card sx={{ width: 270, margin: "auto", mt: 4, boxShadow: 3, height: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="trajet">
            {trajet.conducteur_id && trajet.conducteur_id.username
              ? trajet.conducteur_id.username.charAt(0).toUpperCase()
              : ""}
          </Avatar>
        }
        title={trajet.conducteur_id.username}
        subheader={trajet.createdAt}
        // subheader={new Date(trajet.date_depart).toLocaleDateString()}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Lieux départ :</strong> {trajet.ville_depart}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Lieux arrivée :</strong> {trajet.ville_arrive}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Prix :</strong> {trajet.prix} Dinar
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Nombre de place disponible :</strong> {trajet.prix}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Date départ :</strong>{" "}
          {new Date(trajet.date_depart).toLocaleDateString("fr-CA")}&nbsp;&nbsp;
          {trajet.heure_depart}
        </Typography>

        <Box mt={2}>
          <Link
            href="#"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              py: 1,
              borderRadius: 1,
              fontWeight: "bold",
              textAlign: "center",

              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            Reserver Votre place&nbsp; <ArrowCircleRightIcon />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
