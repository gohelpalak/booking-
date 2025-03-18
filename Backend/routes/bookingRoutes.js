const express = require('express');
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus, cancelBooking } = require('../controllers/bookingController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createbooking',authMiddleware,createBooking);
router.get('/getuserbookings',authMiddleware,getUserBookings);
router.get('/getAllBookings',authMiddleware,isAdmin,getAllBookings);
router.put('/updatebooking/:id',authMiddleware,isAdmin,updateBookingStatus);
router.delete('/deletebooking/:id',authMiddleware,cancelBooking);


module.exports = router;