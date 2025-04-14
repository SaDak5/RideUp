import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavbarAdmin from "../__components/navbaradmin";
import Sidebar from "../__components/sidebaradmin";
import DashboardContent from "../__components/dashboardcontent";

const drawerWidth = 240;

export default function Dashboard(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarAdmin handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <DashboardContent />
      </Box>
    </Box>
  );
}
