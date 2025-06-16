const express = require('express');
const router = express.Router();

const { getUsersWithUnverifiedProofs, verifyRegistration, remindUser } = require('../controller/adminController')

router.get('/users', getUsersWithUnverifiedProofs);

router.post('/verify', verifyRegistration);

router.post('/remind', remindUser);


module.exports = router;