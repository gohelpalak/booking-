const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
,
    },
    brand:{
        type:String,
        required: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    seats: {
        type : Number,
        required: true
    },
    fuelType : {
        type : String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    imageUrl: {
      type:String
    }
});

const car = mongoose.model("car", carSchema);
module.exports = car;