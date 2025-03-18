const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        enum: ['flight', 'hotel','car'],
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },

    enddate: {
        type: Date,
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);


