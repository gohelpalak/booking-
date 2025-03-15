const  mongoose = require('monggose');

const HotelSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    roomsAvailable: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type:Number,
        required: true
    },
    rating:{
        type: Number,default: 0
    },
    images:[{
        type: String
    }]
});

module.exports = mongoose.model('Hotel', HotelSchema);