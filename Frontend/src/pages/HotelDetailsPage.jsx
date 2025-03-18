import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import axios from "axios";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:2024/hotel/gethotelbyid/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:2024/booking/createbooking", {
        hotelId: id,
        userId: "user123", // Replace with actual user ID
      });
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Booking failed! Please try again.");
    }
    setLoading(false);
  };

  if (!hotel) return <Typography>Loading...</Typography>;

  return (
    <Container className="mt-10">
      <Card className="shadow-lg rounded-lg">
        <CardMedia component="img" height="300" image={hotel.imageUrl} alt={hotel.name} />
        <CardContent>
          <Typography variant="h4" className="mb-4">{hotel.name}</Typography>
          <Typography variant="h6" color="text.secondary">{hotel.location}</Typography>
          <Typography variant="body1" className="mt-2">Price: ₹{hotel.price} / night</Typography>
          <Typography variant="body2" className="mt-2">{hotel.description}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            className="mt-4" 
            onClick={handleBooking} 
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HotelDetailsPage;
