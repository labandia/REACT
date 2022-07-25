const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data-controller');

// Register
router.get('/', dataController.readdataController);

module.exports = router;
