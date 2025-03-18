const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const Car = require('../models/car');

exports.createBooking = async (req,res)=>{
    try{
        const { serviceType, serviceId, startDate, endDate, totalPrice } = req.body;
        let service;
        if(serviceType === 'flight'){
            service = await Flight.findById(serviceId);
        }else if(serviceType === 'hotel'){
            service = await Hotel.findById(serviceId);
        }else if(serviceType === 'car'){
            service = await Car.findById(serviceId);
        }
        if(!service){
            return res.status(404).json({message: `${serviceType}not found`});
        }

        const booking = new Booking({
            user: req.user.user.id,
            serviceType,
            serviceId,
            startDate,
            endDate,
            totalPrice
        });

        await booking.save();
        res.status(201).json({message:"Booking created successfully",booking});
        

    }catch(error){
        res.status(400).json({message:"Invalid booking data",error});
    }
};

exports.getUserBookings = async (req,res)=>{
    try{
        const bookings = await Booking.find({user: req.user.user.id}).populate('serviceId');
        res.json(bookings);
    }catch(error){
        res.status(500).json({message:"Error fetching bookings",error});
    }
}

exports.getAllBookings = async(req,res)=>{
    try{
        const bookings = await Booking.find().populate('user serviceId');
        res.json(bookings);
    }catch(error){
        res.status(500).json({message:"Error fetching all bookings",error});
    }
};

exports.updateBookingStatus = async (req,res)=>{
    try{
        const {status} = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id,{status},{new:true});
        if(!booking){return res.status(404).json({message:"Booking not found"})};
        res.json({message:"Booking status updated successfully",booking});
    }catch(error){
        res.status(400).json({message:"Update faild",error});
    }
}


exports.cancelBooking = async (req,res)=>{
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({message:"Booking not found"});

        }

        if(booking.user.toString() !== req.user.user.id){
            return res.status(403).json({message:"You are not authorized to cancel this booking"});
        }

        booking.status = "cancelled";
        await booking.save();
        res.json({message:"Booking cancelled successfully",booking});




    }catch(error){
        res.json({message:"Error cancelling booking",error});
    }
}