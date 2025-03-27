import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid, Container } from "@mui/material";

const FlightPage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("https://booking-d3vy.onrender.com/flight/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();
  }, []);

  const handleBookFlight = (flightId) => {
    console.log("Booking flight:", flightId);
    // Booking logic implement here
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        ✈️ Available Flights
      </Typography>
      <Grid container spacing={3}>
        {flights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight._id}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  {flight.airline}
                </Typography>
                <Typography sx={{ color: "#555" }}>Flight No: {flight.flightNumber}</Typography>
                <Typography sx={{ color: "#888" }}>Departure: {new Date(flight.departureTime).toLocaleString()}</Typography>
                <Typography sx={{ color: "#888" }}>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold", mt: 1 }}>
                  Price: ₹{flight.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#ff4b5c",
                    "&:hover": { backgroundColor: "#c70039" },
                    width: "100%",
                  }}
                  onClick={() => handleBookFlight(flight._id)}
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

export default FlightPage;
