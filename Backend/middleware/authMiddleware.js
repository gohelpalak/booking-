const jwt = require('jsonwebtoken');

exports.authMiddleware = (req,res,next)=>{

    let token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        token = token.split(" ")[1];
        // const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"secret");
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({message:"Unauthorized"});
    }
}

exports.isAdmin = (req,res,next) => {
    if(req.user.role == "admin") {
        return res.status(403).json({message:"Forbidden"});
    }
    next();
}