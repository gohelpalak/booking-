const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        enum: ['flight', 'hotel'],
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'serviceType'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);


