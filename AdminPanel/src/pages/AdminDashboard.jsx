import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Sidebar from "./Sidebar";


const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Flights</Typography>
              <Typography variant="h4">150</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Hotels</Typography>
              <Typography variant="h4">80</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Cars</Typography>
              <Typography variant="h4">50</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
