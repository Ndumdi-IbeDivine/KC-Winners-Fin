const express = require('express');

const router = express.Router()

const { createWithdrawal, getUserWithdrawals, clearWithdrawal} = require('../controller/withdrawalController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { uploadClearanceProof } = require('../config/cloudinary')

router.post(
    '/', 
    verifyToken, 
    uploadClearanceProof.fields([
        { name: 'clearanceProof', maxCount: 1 },
    ]),   
    createWithdrawal);
router.get('/user/:userId', verifyToken, getUserWithdrawals);
router.put('/:id/clear', verifyToken, verifyAdmin, clearWithdrawal);

module.exports = router;