import React, { useEffect, useState } from "react";
import {
    Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
    CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import Sidebar from "../pages/Sidebar";

const FlightsManagement = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newFlight, setNewFlight] = useState({
        airline: "", flightNumber: "", departure: "", arrival: "",
        departureTime: "", arrivalTime: "", price: "", seatsAvailable: "", imageUrl: ""
    });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch("http://localhost:2000/flight/flights", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });
                if (!response.ok) throw new Error("Failed to fetch flights");
                setFlights(await response.json());
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
            const response = await fetch("http://localhost:2000/flight/createflight", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(newFlight),
            });
            if (!response.ok) throw new Error("Failed to add flight");
            const addedFlight = await response.json();
            setFlights([...flights, addedFlight]);
            setOpen(false);
            setNewFlight({
                airline: "", flightNumber: "", departure: "", arrival: "",
                departureTime: "", arrivalTime: "", price: "", seatsAvailable: "", imageUrl: ""
            });
        } catch (error) {
            console.error("Error adding flight:", error);
        }
    };

    const handleDeleteFlight = async (id) => {
        try {
            const response = await fetch(`http://localhost:2000/flight/deleteflight/${id}`, {
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
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
                Add New Flight
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Airline</TableCell>
                        <TableCell>Flight Number</TableCell>
                        <TableCell>Departure</TableCell>
                        <TableCell>Arrival</TableCell>
                        <TableCell>Departure Time</TableCell>
                        <TableCell>Arrival Time</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Seats Available</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flights.map((flight) => (
                        <TableRow key={flight._id}>
                            <TableCell>{flight._id}</TableCell>
                            <TableCell>{flight.airline}</TableCell>
                            <TableCell>{flight.flightNumber}</TableCell>
                            <TableCell>{flight.departure}</TableCell>
                            <TableCell>{flight.arrival}</TableCell>
                            <TableCell>{flight.departureTime}</TableCell>
                            <TableCell>{flight.arrivalTime}</TableCell>
                            <TableCell>{flight.price}</TableCell>
                            <TableCell>{flight.seatsAvailable}</TableCell>
                            <TableCell>
                                <img src={flight.imageUrl} alt="Flight" width="100" height="100" />
                            </TableCell>
                            <TableCell>
                                <Button color="secondary">Edit</Button>
                                <Button color="error" onClick={() => handleDeleteFlight(flight._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog for Adding New Flight */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Flight</DialogTitle>
                <DialogContent>
                    <TextField label="Airline" fullWidth margin="normal" value={newFlight.airline} onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })} />
                    <TextField label="Flight Number" fullWidth margin="normal" value={newFlight.flightNumber} onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })} />
                    <TextField label="Departure" fullWidth margin="normal" value={newFlight.departure} onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })} />
                    <TextField label="Arrival" fullWidth margin="normal" value={newFlight.arrival} onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })} />
                    <TextField label="Departure Time" fullWidth margin="normal" type="text" value={newFlight.departureTime} onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })} />
                    <TextField label="Arrival Time" fullWidth margin="normal" type="text" value={newFlight.arrivalTime} onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })} />
                    <TextField label="Price" fullWidth margin="normal" type="number" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} />
                    <TextField label="Seats Available" fullWidth margin="normal" type="number" value={newFlight.seatsAvailable} onChange={(e) => setNewFlight({ ...newFlight, seatsAvailable: e.target.value })} />
                    <TextField label="Image URL" fullWidth margin="normal" value={newFlight.imageUrl} onChange={(e) => setNewFlight({ ...newFlight, imageUrl: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleAddFlight} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default FlightsManagement;
