const express = require('express');
const { getflights, addflight, getFlightById, updateFlight, deleteFlight } = require('../controllers/flightController');
const { authMiddleware, isAdmin } = require(`../middleware/authMiddleware`)

const router = express.Router();

router.get('/flights', getflights);
router.post("/createflight", authMiddleware, isAdmin, addflight);
router.get("/getflightbyid/:id", getFlightById);
router.put("/updateflight/:id", authMiddleware, isAdmin, updateFlight);
router.delete("/deleteflight/:id", authMiddleware, isAdmin, deleteFlight);


module.exports = router;