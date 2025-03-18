import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="text-center mt-10">
      <Typography variant="h3" className="mb-4">
        Welcome to Travel Booking System ✈️🏨🚗
      </Typography>
      <Typography variant="h6" className="mb-6">
        Book Flights, Hotels, and Rental Cars with ease.
      </Typography>

      <div className="flex justify-center gap-6 mt-6">
        <Link to="/flights">
          <Button variant="contained" color="primary" size="large">
            Book Flights
          </Button>
        </Link>
        <Link to="/hotels">
          <Button variant="contained" color="secondary" size="large">
            Book Hotels
          </Button>
        </Link>
        <Link to="/cars">
          <Button variant="contained" color="success" size="large">
            Rent a Car
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
