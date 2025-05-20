const express = require('express');

const { createContribution } = require('../controller/contributionController');

const router = express.Router();

router.post('/create', createContribution);

module.exports = router;