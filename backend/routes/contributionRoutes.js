const express = require('express');

const router = express.Router();

const { createContribution, getUserContributions, verifyContribution } = require('../controller/contributionController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { uploadContributionProof } = require('../config/cloudinary')

router.post(
    '/create', 
    uploadContributionProof.fields([
        { name: 'contributionProof', maxCount: 1 },
    ]),  
    createContribution);
router.get('/user/:userId', verifyToken, getUserContributions);
router.put('/:id/verify', verifyToken, verifyAdmin, verifyContribution);

module.exports = router;