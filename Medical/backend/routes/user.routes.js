const express = require('express')
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/userupdate', userController.updatemuserController);

router.get('/', userController.getalluserController);

router.get('/:id', userController.getuserbyIdController);

router.post('/:id', userController.deleteuserController);


module.exports = router;