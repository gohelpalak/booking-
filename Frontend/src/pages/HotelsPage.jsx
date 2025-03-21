import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:2000/hotel/getallhotel");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="mb-6 text-center">
        🏨 Available Hotels
      </Typography>

      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card className="shadow-lg rounded-lg">
              <CardMedia component="img" height="200" image={hotel.imageUrl} alt={hotel.name} />
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.location}
                </Typography>
                <Typography variant="body1" className="mt-2 font-bold">
                  ₹{hotel.price} / night
                </Typography>
                <Link to={`/hotels/${hotel._id}`}>
                  <Button variant="contained" color="primary" className="mt-4">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelsPage;
