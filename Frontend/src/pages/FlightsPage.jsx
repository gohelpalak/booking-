import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";

const FlightPage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:2024/flights");
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
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Available Flights ✈️
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map((flight) => (
          <Card key={flight._id} className="p-4 shadow-md">
            <CardContent>
              <Typography variant="h6">{flight.airline}</Typography>
              <Typography>Flight No: {flight.flightNumber}</Typography>
              <Typography>
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </Typography>
              <Typography>
                Arrival: {new Date(flight.arrivalTime).toLocaleString()}
              </Typography>
              <Typography>Price: ₹{flight.price}</Typography>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => handleBookFlight(flight._id)}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightPage;
