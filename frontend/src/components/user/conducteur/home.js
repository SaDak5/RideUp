import { Box } from "@mui/material";
import Navbar from "../__components/navbar";
import TableTrajet from "../__components/tableTrajet";

const HomeConducteur = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "92%",
          mt: 4,
          marginLeft: 9,
        }}
      >
        <TableTrajet />
      </Box>
    </Box>
  );
};

export default HomeConducteur;
