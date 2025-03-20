// src/pages/FlightsManagement.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Sidebar from "../pages/Sidebar"


const FlightsManagement = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newFlight, setNewFlight] = useState({ name: "", destination: "", price: "", seatsAvailable: "", imageUrl: "" });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch("http://localhost:2024/flight/getallflights", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });
                const data = await response.json();
                setFlights(data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    const handleAddFlight = async () => {
        try {
            console.log("Adding flight:", newFlight);
            const response = await fetch("http://localhost:2024/flight/addflight", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify(newFlight)
            });
            if (!response.ok) throw new Error("Failed to add flight");
            const addedFlight = await response.json();
            setFlights([...flights, addedFlight]);
            setOpen(false);
            setNewFlight({ name: "", destination: "", price: "", seatsAvailable: "", imageUrl: "" });
        } catch (error) {
            console.error("Error adding flight:", error);
        }
    };

    const handleDeleteFlight = async (id) => {
        try {
            const response = await fetch(`http://localhost:2024/flight/deleteflight/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
            });
            if (!response.ok) throw new Error("Failed to delete flight");
            setFlights(flights.filter(flight => flight._id !== id));
        } catch (error) {
            console.error("Error deleting flight:", error);
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

    return (
        <Container>
            <Sidebar />
            <Typography variant="h4" sx={{ my: 3 }}>Manage Flights</Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpen(true)}>Add New Flight</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Flight</DialogTitle>
                <DialogContent>
                    <TextField label="Flight Name" fullWidth margin="normal" value={newFlight.name} onChange={(e) => setNewFlight({ ...newFlight, name: e.target.value })} />
                    <TextField label="Destination" fullWidth margin="normal" value={newFlight.destination} onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })} />
                    <TextField label="Price" fullWidth margin="normal" type="number" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} />
                    <TextField label="Seats Available" fullWidth margin="normal" type="number" value={newFlight.seatsAvailable} onChange={(e) => setNewFlight({ ...newFlight, seatsAvailable: e.target.value })} />
                    <TextField label="Image URL" fullWidth margin="normal" value={newFlight.imageUrl} onChange={(e) => setNewFlight({ ...newFlight, imageUrl: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddFlight} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Flight Name</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flights.map((flight) => (
                        <TableRow key={flight._id}>
                            <TableCell>{flight._id}</TableCell>
                            <TableCell>{flight.name}</TableCell>
                            <TableCell>{flight.destination}</TableCell>
                            <TableCell>
                                <Button color="secondary">Edit</Button>
                                <Button color="error" onClick={() => handleDeleteFlight(flight._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default FlightsManagement;