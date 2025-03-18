import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid, Container, CircularProgress } from "@mui/material";

const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:2024/cars/getallcars");
                console.log("Fetched Cars:", response.data); // Debugging Line
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleBookCar = (carId) => {
        console.log("Booking car with ID:", carId);
    };

    if (loading) {
        return (
            <Container sx={{ textAlign: "center", mt: 10 }}>
                <CircularProgress />
                <Typography variant="h6">Loading Cars...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
                🚗 Available Cars for Rent
            </Typography>
            <Grid container spacing={3}>
                {cars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car._id}>
                        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                            <img
                                src={car.imageUrl}
                                alt={car.name}
                                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                                onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    {car.name}
                                </Typography>
                                <Typography>Price: ₹{car.price} / day</Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, backgroundColor: "#ff4b5c", "&:hover": { backgroundColor: "#c70039" }, width: "100%" }}
                                    onClick={() => handleBookCar(car._id)}
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CarPage;
