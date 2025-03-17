const express = require('express');
const { registerAdmin, loginAdmin, getUserProfule } = require('../../controllers/adminController');
const { authMiddleware } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/register',registerAdmin);
router.post('/login',loginAdmin);
router.get('/profile',authMiddleware,getUserProfule);

module.exports = router;