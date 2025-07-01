const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require('../controller/userController');
const { verifyToken } = require("../middleware/authMiddleware");

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile)



module.exports = router;