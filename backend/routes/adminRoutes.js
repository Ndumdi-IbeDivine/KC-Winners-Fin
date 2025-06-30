const express = require('express');
const router = express.Router();

const { getUsersWithUnverifiedProofs, verifyRegistration, remindUser } = require('../controller/adminController')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware')

router.get('/users', verifyToken, verifyAdmin, getUsersWithUnverifiedProofs);

router.post('/verify', verifyToken, verifyAdmin,verifyRegistration);

router.post('/remind', remindUser);


module.exports = router;