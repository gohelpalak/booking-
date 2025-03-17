const express = require('express');
const router = express.Router();

router.use('/Admin',require('./admin/admin.routes')),
router.use('/flight',require('./flightRoutes'))
router.use('/hotel',require('./hotelRoutes'))
// router.use('/flight',require('./flightRoutes'));
module.exports = router;