const express = require('express');
const { registerAdmin, loginAdmin, getUserProfile } = require('../../controllers/adminController');
const { authMiddleware } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/register',registerAdmin);
router.post('/login',loginAdmin);
router.get('/profile',authMiddleware,getUserProfile);

module.exports = router;