import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Featured = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Featured Deals</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Popular Flights</Typography>
            <Typography>Best prices on top airlines!</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Luxury Hotels</Typography>
            <Typography>Book your stay at premium hotels.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Affordable Car Rentals</Typography>
            <Typography>Get cars at the best rates.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Featured;
