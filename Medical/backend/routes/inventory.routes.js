const express = require('express')
const router = express.Router();
const inventController = require('../controllers/inventory-controller');

router.get('/', inventController.getinventoryController);

module.exports = router;