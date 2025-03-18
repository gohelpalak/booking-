const Hotel = require("../models/Hotel");
// const express = require('express');
// const router = express.Router();

const upload = require('../middleware/uploadMiddleware');


// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single hotel
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create hotel (Admin Only)
exports.createHotel = async (req, res) => {
  try {

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const hotel = new Hotel(req.body, imageUrl);
    await hotel.save();
    res.status(201).json({ message: "Hotel created successfully", hotel });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Update hotel (Admin Only)
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Delete hotel (Admin Only)
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};