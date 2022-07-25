const express = require('express');
const router = express.Router();
const authRouter = require('./auth.routes');
const medRouter = require('./med.routes');
const dataRouter = require('./data.routes');
const userRouter = require('./user.routes');
const inventRouter = require('./inventory.routes');
const supplyRouter = require('./supply.routes');



router.use('/', authRouter);
router.use('/med', medRouter);
router.use('/data', dataRouter);
router.use('/users', userRouter);
router.use('/invent', inventRouter);
router.use('/sup', supplyRouter);

 
module.exports = router;