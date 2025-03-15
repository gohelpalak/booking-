const jwt = require('jsonwebtoken');

exports.authMiddleware = (req,res,next)=>{

    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        // const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"secret");
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({message:"Unauthorized"});
    }
}