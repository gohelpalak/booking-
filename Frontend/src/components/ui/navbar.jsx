import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Travel Booking</Link>
      <div>
        <Link to="/flights" className="mx-2 hover:underline">Flights</Link>
        <Link to="/hotels" className="mx-2 hover:underline">Hotels</Link>
        <Link to="/cars" className="mx-2 hover:underline">Car Rentals</Link>
        <Link to="/login" className="mx-2 hover:underline">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;