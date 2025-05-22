const express = require('express');
const upload = require('../config/cloudinary');
const { registerUser } = require('../controller/authController');
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

module.exports = router;