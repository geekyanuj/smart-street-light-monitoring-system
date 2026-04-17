const express = require('express');
const router = express.Router();
const feederController = require('../controllers/feederController');

router.get('/', feederController.getAllFeeders);
router.get('/hierarchy', feederController.getWardsAndAreas);
router.get('/:id', feederController.getFeederById);
router.post('/', feederController.upsertFeeder);

module.exports = router;
