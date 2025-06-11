const express = require('express');
const upload = require('../config/cloudinary');
const { registerUser, loginUser } = require('../controller/authController');
const uploadMultipleProofs = require('../config/cloudinary')

const router = express.Router();


router.post(
    '/register', 
    uploadMultipleProofs.fields([
        { name: 'registrationProof', maxCount: 1 },
        { name: 'clearanceProof', maxCount: 1 }
    ]), 
    registerUser
);
router.post('/login', loginUser);
module.exports = router;