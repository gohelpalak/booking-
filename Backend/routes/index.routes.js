const express = require('express');
const router = express.Router();

router.use('/Admin',require('./admin/admin.routes'));

module.exports = router;