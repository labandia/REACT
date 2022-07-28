const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const mongoRouter = require("./mongo.routes");

router.use("/mongo", mongoRouter);
router.use("", authRouter);
router.use("/images", express.static("public/images"));

module.exports = router;
