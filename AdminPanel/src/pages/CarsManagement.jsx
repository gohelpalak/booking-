// src/pages/CarsManagement.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";

const CarsManagement = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

    return (
        <Container>
            <Sidebar />
            <Typography variant="h4" sx={{ my: 3 }}>Manage Car Rentals</Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>Add New Car</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Car Model</TableCell>
                        <TableCell>Rental Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((car) => (
                        <TableRow key={car._id}>
                            <TableCell>{car._id}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>${car.price}</TableCell>
                            <TableCell>
                                <Button color="secondary">Edit</Button>
                                <Button color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default CarsManagement;
