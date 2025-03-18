import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Card, CardContent } from "../components/ui/card";
import Card from "../components/ui/card";
// import CardContent from "../components/ui/cardcontent";
import Button from "../components/ui/button";


const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:2024/cars/getallcars");
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
        // API Call for booking logic can be added here
    };

    if (loading) {
        return <p className="text-center text-lg">Loading cars...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Available Cars for Rent</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car._id} className="p-4 shadow-lg">
                        <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded-md" />
                        <CardContent>
                            <h2 className="text-xl font-semibold">{car.name}</h2>
                            <p className="text-gray-600">Price: ${car.price} / day</p>
                            <Button className="mt-3 w-full" onClick={() => handleBookCar(car._id)}>
                                Book Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CarPage;