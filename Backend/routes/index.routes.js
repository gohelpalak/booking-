const express = require('express');
const router = express.Router();

router.use('/Admin',require('./admin/admin.routes')),
router.use('/flight',require('./flightRoutes'))
router.use('/hotel',require('./hotelRoutes'))
router.use('/cars',require('./carRoutes'))
router.use('/booking',require('./bookingRoutes'));
router.use('/image', require('./image.Routes'));
module.exports = router;