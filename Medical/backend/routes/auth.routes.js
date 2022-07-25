const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// Register
router.post('/addusers', authController.registerController);

// Login
router.post('/login', authController.loginController);

router.get('/session', authController.refreshTokenController);



module.exports = router;
