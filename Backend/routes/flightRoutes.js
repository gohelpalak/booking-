const express = require('express');
const { getflights , addflight, getFlightById, updateFlight, deleteFlight } = require('../controllers/flightController');

const router = express.Router();

router.get('/flights',getflights);
router.post("/addflight",addflight);
router.get("/getflightbyid/:id", getFlightById);
router.put("/updateflight/:id", updateFlight);
router.delete("/deleteflight/:id", deleteFlight);


module.exports = router;