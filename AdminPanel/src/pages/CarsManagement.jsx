// src/pages/CarsManagement.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Sidebar from "../pages/Sidebar";

const CarsManagement = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newCar, setNewCar] = useState({
        name: "",
        brand: "",
        modelYear: "",
        pricePerDay: "",
        seats: "",
        fuelType: "",
        available: true,
        imageUrl: ""
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost:2024/cars/getallcars", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleAddCar = async () => {
        console.log("Adding car:", newCar);

        // try {
        //     const response = await fetch("http://localhost:2024/cars/addcar", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        //         },
        //         body: JSON.stringify({
        //             name: newCar.name,
        //             brand: newCar.brand,
        //             modelYear: Number(newCar.modelYear), // Ensure it's a number
        //             pricePerDay: Number(newCar.pricePerDay),
        //             seats: Number(newCar.seats),
        //             fuelType: newCar.fuelType,
        //             available: Boolean(newCar.available),
        //             imageUrl: newCar.imageUrl || "" 
        //         })


        //     });
        //     console.log("Response:", response);

        //     if (!response.ok) throw new Error("Failed to add car");
        //     const addedCar = await response.json();
        //     console.log("Added Car:", addedCar);

        //     setCars([...cars, addedCar]);
        //     setOpen(false);
        //     setNewCar({ name: "", brand: "", modelYear: "", pricePerDay: "", seats: "", fuelType: "", available: true, imageUrl: "" });
        // } catch (error) {
        //     console.error("Error adding car:", error);
        // }
        try {
            const response = await fetch("http://localhost:2024/cars/addcar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({
                    name: newCar.name,
                    brand: newCar.brand,
                    modelYear: Number(newCar.modelYear),
                    pricePerDay: Number(newCar.pricePerDay),
                    seats: Number(newCar.seats),
                    fuelType: newCar.fuelType,
                    available: Boolean(newCar.available),
                    imageUrl: newCar.imageUrl || ""
                })
            });

            const responseData = await response.json();
            console.log("Response Status:", response.status);
            console.log("Response Data:", responseData);

            if (!response.ok) {
                throw new Error(responseData.error || "Failed to add car");
            }

            console.log("Added Car:", responseData);
            setCars([...cars, responseData]);
            setOpen(false);
            setNewCar({ name: "", brand: "", modelYear: "", pricePerDay: "", seats: "", fuelType: "", available: true, imageUrl: "" });

        } catch (error) {
            console.error("Error adding car:", error.message);
        }

    };

    const handleDeleteCar = async (id) => {
        try {
            await fetch(`http://localhost:2024/admin/cars/deletecar/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
            });
            setCars(cars.filter(car => car._id !== id));
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

    return (
        <Container>
            <Sidebar />
            <Typography variant="h4" sx={{ my: 3 }}>Manage Car Rentals</Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpen(true)}>Add New Car</Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogContent>
                    <TextField label="Car Name" fullWidth margin="normal" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} />
                    <TextField label="Brand" fullWidth margin="normal" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
                    <TextField label="Model Year" fullWidth margin="normal" type="number" value={newCar.modelYear} onChange={(e) => setNewCar({ ...newCar, modelYear: e.target.value })} />
                    <TextField label="Price Per Day" fullWidth margin="normal" type="number" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} />
                    <TextField label="Seats" fullWidth margin="normal" type="number" value={newCar.seats} onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })} />
                    <TextField label="Fuel Type" fullWidth margin="normal" value={newCar.fuelType} onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })} />
                    <FormControlLabel control={<Checkbox checked={newCar.available} onChange={(e) => setNewCar({ ...newCar, available: e.target.checked })} />} label="Available" />
                    <TextField label="Image URL" fullWidth margin="normal" value={newCar.imageUrl} onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddCar} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Car Model</TableCell>
                        <TableCell>Rental Price</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((car) => (
                        <TableRow key={car._id}>
                            <TableCell>{car._id}</TableCell>
                            <TableCell>{car.name}</TableCell>
                            <TableCell>${car.pricePerDay}</TableCell>
                            <TableCell><img src={car.imageUrl} alt={car.name} width="50" height="50" /></TableCell>
                            <TableCell>
                                <Button color="secondary">Edit</Button>
                                <Button color="error" onClick={() => handleDeleteCar(car._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default CarsManagement;