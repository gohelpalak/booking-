const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {

    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        token = token.split(" ")[1];
        // const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role == "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

// const jwt = require("jsonwebtoken");
// // const User = require("../models/user");

// exports.authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN_VALUE"

//         console.log("Received Token:", token); // 🛠 Debugging Purpose

//         if (!token) {
//             return res.status(401).json({ message: "Access Denied. No token provided!" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error("JWT Error:", error.message);
//         return res.status(401).json({ message: "Invalid or Expired Token" });
//     }
// };