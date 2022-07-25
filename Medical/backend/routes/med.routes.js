const express = require('express')
const router = express.Router();
const medController = require('../controllers/medicine-controller');

router.post('/addmed', medController.createmedicineController);

router.get('/', medController.getmedicineController);

router.post('/updatemed', medController.updatemedicineController);

router.post('/:id', medController.deletemedicineController);


module.exports = router;