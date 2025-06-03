const express = require('express');

const router = express.Router();

const { createContribution } = require('../controller/contributionController');

router.post('/create', createContribution);
router.get('/allContributions');

module.exports = router;