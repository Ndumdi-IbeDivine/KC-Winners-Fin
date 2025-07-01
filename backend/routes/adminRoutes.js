const express = require('express');
const router = express.Router();

const { getPendingRegistrations, verifyRegistration, getPendingContributions, getPendingWithdrawals } = require('../controller/adminController')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware')

router.get('/registrations/pending', verifyToken, verifyAdmin, getPendingRegistrations);
router.put('/registrations/:userId/verify', verifyToken, verifyAdmin, verifyRegistration);
router.get('/contributions/pending', verifyToken, verifyAdmin, getPendingContributions);
router.get('/withdrawals/pending',verifyToken, verifyAdmin, getPendingWithdrawals);


module.exports = router;