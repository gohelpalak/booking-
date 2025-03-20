import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Flight, Hotel, DirectionsCar, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/flight/flights">
          <ListItemIcon><Flight /></ListItemIcon>
          <ListItemText primary="Flights" />
        </ListItem>
        <ListItem button component={Link} to="/admin/hotels">
          <ListItemIcon><Hotel /></ListItemIcon>
          <ListItemText primary="Hotels" />
        </ListItem>
        <ListItem button component={Link} to="/admin/cars">
          <ListItemIcon><DirectionsCar /></ListItemIcon>
          <ListItemText primary="Car Rentals" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
