const express = require('express');
const router = express.Router();

const { getUsersWithUnverifiedProofs, verify, remindUser } = require('../controller/adminController')

router.get('/user/unverified-proofs', getUsersWithUnverifiedProofs);

router.post('/verify', verify);

router.post('/user/remind/user:id', remindUser);

// router.patch('/verify-clearance/user:id', verifyClearance);

module.exports = router;