const express = require("express");
const { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require("../controllers/hotelController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require("../controllers/hotelController");
// const { authMiddleware, isdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getallhotel", getAllHotels);
router.get("/gethotelbyid/:id", getHotelById);
router.post("/createhotel", authMiddleware, isAdmin,createHotel);
router.put("/updateHotel/:id", authMiddleware, isAdmin, updateHotel);
router.delete("/deleteHotel/:id", authMiddleware, isAdmin, deleteHotel);

module.exports = router;

