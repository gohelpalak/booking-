const express = require('express');
const { getAllCars, getCarById, addcar, updateCar, deleteCar } = require('../controllers/carController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getallcars',getAllCars);
router.get("/getcarById/:id", getCarById);
router.post("/addcar",authMiddleware,isAdmin,addcar);
router.put("/updatecar/:id",authMiddleware,isAdmin,updateCar);
router.delete("/deletecar/:id",authMiddleware,isAdmin,deleteCar);

module.exports = router;