const express = require('express');
const router = express.Router();
const telemetryController = require('../controllers/telemetryController');

router.get('/latest', telemetryController.getLatest);
router.get('/history', telemetryController.getHistory);

module.exports = router;
