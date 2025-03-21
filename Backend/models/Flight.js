const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true
    },      // Airline Name
    flightNumber: {
        type: String,
        required: true
    }, // Flight No (Eg: AI-302)
    departure: {
        type: String,
        required: true
    },    // Departure Location
    arrival: {
        type: String,
        required: true
    },      // Arrival Location
    // departureTime: {
    //     type: Date,
    //     required: true
    // },  // Departure Time
    // arrivalTime: {
    //     type: Date,
    //     required: true
    // },    // Arrival Time
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },        // Ticket Price
    seatsAvailable: {
        type: Number,
        required: true
    }, // Available Seats
    createdAt: {
        type: Date,
        default: Date.now
    },   // Record Creation Time

    imageUrl: {
        type: String
    }
});

module.exports = mongoose.model('Flight', flightSchema);