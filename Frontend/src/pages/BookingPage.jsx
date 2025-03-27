import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    user: "",
    flight: "",
    hotel: "",
    car: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://booking-d3vy.onrender.com/bookings", bookingData);
      console.log(response.data);
      navigate("/confirmation");
    } catch (error) {
      console.error("Booking Failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Book Your Travel
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          name="user"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Flight ID"
          name="flight"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Hotel ID"
          name="hotel"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Car ID"
          name="car"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Booking Date"
          type="date"
          name="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Confirm Booking
        </Button>
      </form>
    </Container>
  );
};

export default BookingPage;