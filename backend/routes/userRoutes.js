const express = require("express");
const router = express.Router();
const getProfile = require('../controller/userController');
const authenticateUser = require("../middleware/authMiddleware");

router.get("/profile", authenticateUser, getProfile);

module.exports = router;
