import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Travel Booking
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/flights">Flights</Button>
                <Button color="inherit" component={Link} to="/hotels">Hotels</Button>
                <Button color="inherit" component={Link} to="/cars">Car Rentals</Button>
                <Button color="inherit" component={Link} to="/admin/login">Admin</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
