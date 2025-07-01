const express = require('express');
const { register, login} = require('../controller/authController');
const { uploadRegistrationProof } = require('../config/cloudinary')

const router = express.Router();


router.post(
    '/register', 
    uploadRegistrationProof.fields([
        { name: 'registrationProof', maxCount: 1 },
    ]), 
    register
);

router.post('/login', login);

module.exports = router;