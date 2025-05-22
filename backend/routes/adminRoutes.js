const express = require('express');
const router = express.Router();

const { getUsersWithUnverifiedProofs, verifyRegistration, verifyClearance, } = require('../controller/adminController')

router.get('/unverified-proofs', getUsersWithUnverifiedProofs);

router.patch('/verify-registration/user:id', verifyRegistration);

router.patch('/verify-clearance/user:id', verifyClearance);