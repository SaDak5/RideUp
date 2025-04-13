import { Box } from "@mui/material";
import Navbar from "../__components/navbar";
import StickyHeadTable from "../__components/tableResPass";

const Reservation = () => {
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
        <StickyHeadTable />
      </Box>
    </Box>
  );
};

export default Reservation;
