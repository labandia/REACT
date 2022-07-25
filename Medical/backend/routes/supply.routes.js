const express = require('express')
const router = express.Router();
const supplyController = require('../controllers/suppliers-controller');


router.get('/', supplyController.getsupplyController);

router.get('/supply/:id', supplyController.getsupplybyIdController);



module.exports = router;