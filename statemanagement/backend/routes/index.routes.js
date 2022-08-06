const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");

router.use("", authRouter);
router.use("/images", express.static("uploads"));

module.exports = router;
