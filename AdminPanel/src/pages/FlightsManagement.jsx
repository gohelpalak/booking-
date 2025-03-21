import React, { useEffect, useState } from "react";
import {
    Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
    CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Sidebar from "../pages/Sidebar";

const FlightsManagement = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newFlight, setNewFlight] = useState({
        airline: "", flightNumber: "", departure: "", arrival: "",
        departureTime: null, arrivalTime: null, price: "", seatsAvailable: "", imageUrl: ""
    });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch("http://localhost:2024/flight/flights",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                    });

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
                }

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
            const response = await fetch("http://localhost:2024/flight/addflight    ", { // ✅ Corrected API URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({
                    ...newFlight,
                    departureTime: newFlight.departureTime ? newFlight.departureTime.toISOString() : null,
                    arrivalTime: newFlight.arrivalTime ? newFlight.arrivalTime.toISOString() : null
                })
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setFlights([...flights, data]);
            setOpen(false);
        } catch (error) {
            console.error("Error adding flight:", error);
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            <TableCell>airline</TableCell>
                            <TableCell>flightNumber</TableCell>
                            <TableCell>departure</TableCell>
                            <TableCell>arrival</TableCell>
                            <TableCell>departureTime</TableCell>
                            <TableCell>arrivalTime</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>seatsAvailable</TableCell>
                            <TableCell>imageUrl</TableCell>
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
                                {/* <TableCell>{flight.imageUrl}</TableCell> */}
                                <TableCell><img src="{flight.imageUrl}" alt="{flight.imageUrl}" /></TableCell>
                                <TableCell>
                                    <Button color="secondary">Edit</Button>
                                    <Button color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Add Flight Modal */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New Flight</DialogTitle>
                    <DialogContent>
                        {Object.keys(newFlight).map((key) => (
                            key === "departureTime" || key === "arrivalTime" ? (
                                <DesktopDateTimePicker
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={newFlight[key]}
                                    onChange={(newValue) => setNewFlight({ ...newFlight, [key]: newValue })}
                                />
                            ) : (
                                <TextField
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    fullWidth
                                    margin="dense"
                                    value={newFlight[key]}
                                    onChange={(e) => setNewFlight({ ...newFlight, [key]: e.target.value })}
                                />
                            )
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                        <Button onClick={handleAddFlight} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </LocalizationProvider>
    );
};

export default FlightsManagement;