const Flight = require("../models/Flight");
const express = require("express");
// const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

exports.getflights = async(req,res)=>{
    try{
        const flights = await Flight.find();
        res.status(200).json(flights);
    }catch(error){
        res.status(500).json({message:"Server error",error: error.message});
    }
}

exports.addflight = async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const flightData = { ...req.body, image: imageUrl }; // 🛠️ Corrected data structure
        const flight = new Flight(flightData); // 🛠️ Spread operator for proper object structure

        await flight.save();
        res.status(201).json({ message: "Flight added successfully", flight });
    } catch (error) {
        res.status(400).json({ message: "Invalid Data", error });
    }
};



exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) return res.status(404).json({ message: "Flight Not Found" });
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.updateFlight = async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFlight) return res.status(404).json({ message: "Flight Not Found" });
        res.status(200).json({ message: "Flight Updated", updatedFlight });
    } catch (error) {
        res.status(400).json({ message: "Invalid Update", error });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
        if (!deletedFlight) return res.status(404).json({ message: "Flight Not Found" });
        res.status(200).json({ message: "Flight Deleted", deletedFlight });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};