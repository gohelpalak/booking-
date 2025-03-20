import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ textAlign: "center", py: 5, bgcolor: "lightblue" }}>
      <Typography variant="h3" gutterBottom>
        Find Your Perfect Trip!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <TextField label="Search Destination" variant="outlined" />
        <Button variant="contained" color="primary">Search</Button>
      </Box>
    </Box>
  );
};

export default Hero;
