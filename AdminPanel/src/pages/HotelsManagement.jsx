// src/pages/HotelsManagement.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Sidebar from "../pages/Sidebar";

const HotelsManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newHotel, setNewHotel] = useState({ name: "", location: "", price: "", availableRooms: "", imageUrl: "" });

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch("http://localhost:2024/hotel/getallhotel", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleAddHotel = async () => {
        try {
            console.log("Adding hotel:", newHotel); // Debugging
            const response = await fetch("http://localhost:2024/hotel/createhotel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify(newHotel)
            });
            if (!response.ok) throw new Error("Failed to add hotel");
            const addedHotel = await response.json();
            setHotels([...hotels, addedHotel]);
            setOpen(false);
            setNewHotel({ name: "", location: "", price: "", availableRooms: "", imageUrl: "" }); // Reset form
        } catch (error) {
            console.error("Error adding hotel:", error);
        }
    };

    const handleDeleteHotel = async (id) => {
        try {
            const response = await fetch(`http://localhost:2024/hotel/deletehotel/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
            });
            if (!response.ok) throw new Error("Failed to delete hotel");
            setHotels(hotels.filter(hotel => hotel._id !== id));
        } catch (error) {
            console.error("Error deleting hotel:", error);
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

    return (
        <Container>
            <Sidebar />
            <Typography variant="h4" sx={{ my: 3 }}>Manage Hotels</Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpen(true)}>Add New Hotel</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Hotel</DialogTitle>
                <DialogContent>
                    <TextField label="Hotel Name" fullWidth margin="normal" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} />
                    <TextField label="Location" fullWidth margin="normal" value={newHotel.location} onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })} />
                    <TextField label="Price" fullWidth margin="normal" type="number" value={newHotel.price} onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })} />
                    <TextField label="Available Rooms" fullWidth margin="normal" type="number" value={newHotel.availableRooms} onChange={(e) => setNewHotel({ ...newHotel, availableRooms: e.target.value })} />
                    <TextField label="Image URL" fullWidth margin="normal" value={newHotel.imageUrl} onChange={(e) => setNewHotel({ ...newHotel, imageUrl: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddHotel} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Hotel Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hotels.map((hotel) => (
                        <TableRow key={hotel._id}>
                            <TableCell>{hotel._id}</TableCell>
                            <TableCell>{hotel.name}</TableCell>
                            <TableCell>{hotel.location}</TableCell>
                            <TableCell>{hotel.price}</TableCell>
                            <TableCell><img src={hotel.imageUrl} alt={hotel.name} style={{ width: "100px", height: "100px" }} /></TableCell>
                            <TableCell>
                                <Button color="secondary">Edit</Button>
                                <Button color="error" onClick={() => handleDeleteHotel(hotel._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default HotelsManagement;