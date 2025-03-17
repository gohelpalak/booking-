const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerAdmin= async (req,res)=>{
    console.log("Headers:", req.headers); 
    console.log("body",req.body);
    
    try{

        console.log("Incoming Request Body:", req.body);
        
        const {name,email,password,role="admin"} = req.body;

        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message:"User already exists"});

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user =new User ({name,email,password:hashedPassword,role});
        await user.save();

        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
};
exports.loginAdmin = async (req,res)=>{
    console.log("body",req.body);

    try{
        const {email,password} = req.body;
        console.log("===========",email,password);
        
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message:"User not found"});
        }

    //     const isMatch = await bcrypt.compare(password,user.password);
    //     if(!isMatch) {
    //         return res.status(400).json({message:"Invalid credentials"});
    //     }
    //     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //     res.status(200).json({ message: 'Login successful', token, user });
    //   } catch (error) {
    //     res.status(500).json({ message: 'Server error' });
    //   }
        const payload = {
            user: {
                id:user.id
            }    
        };
        jwt.sign(payload,"secret",{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
    
}

exports.getUserProfule = async (req,res)=>{
    try{
        console.log("req.user",req.user);
        
        const  user = await User.findById(req.user.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    }catch(error){
        res.status(500).json({message:"Server error",error: error.message});
    }
}