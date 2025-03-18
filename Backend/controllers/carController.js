const Car  = require('../models/car');
const upload = require('../middleware/uploadMiddleware');


exports.getAllCars = async (req,res)=>{
    try{
        const cars = await Car.find();
        res.json(cars);

    }catch(error){
        res.status(500).json({message:"Error fetching cars", error});
    }
};

exports.getCarById = async (req,res)=>{
    try{
        const car = await Car.findById(req.params.id);
        if(!car){
            return res.status(404).json({message:"Car not found"});
        }
        res.json(car);
    }catch(error){
        res.status(500).json({message:"Error fetching car", error});    
    }
}

exports.addcar = async (req,res)=>{
    try{

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const car = new Car(req.body,imageUrl);
        await car.save();
        res.status(201).json({message:"Car added successfully",car});
        }catch(error){
            res.status(400).json({message:"Invalid data",error});
        }
} ;

exports.updateCar = async (req,res)=>{
    try{
        const car = await Car.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!car){
            return res.status(404).json({message:"Car not found"});
        }
        res.json({message:"Car updated successfully",car});
    }catch(error){
        res.status(400).json({message:"Update failed",error});
    }
};

exports.deleteCar = async (req,res)=>{
    try{
        const car = await Car.findByIdAndDelete(req.params.id);
        if(!car){
            return res.status(404).json({message:"Car not found"});
        }
        res.json({message:"Car deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Error deleting car",error});
    }
};