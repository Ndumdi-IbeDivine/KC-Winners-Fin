const express = require('express');

const router = express.Router();

const { createContribution } = require('../controller/contributionController');

router.post('/create', createContribution);

module.exports = router;