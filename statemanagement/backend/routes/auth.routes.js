const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const register = require("../controller/dave/register.controller");
const auth = require("../controller/dave/login.controller");
const employee = require("../controller/dave/employee.controller");
const refresher = require("../controller/dave/refreshtoken.controller");

//MONGO CONTROLLER
const mongoregister = require("../controller/mongo/registermongo-controller");
const mongologin = require("../controller/mongo/loginmongo.controller");

const verifytoken = require("../lib/utils").authMiddleware;

router.post("/regist", authController.registerController);

router.post("/login", authController.loginController);

router.get("/info/:id", authController.userinfoController);

router.get("/refresh1", authController.refreshTokenController);

//THIS IS FOR SAVING A FILE TXT
router.post("/newuser", register.addUser);
router.post("/loginuser", auth.loginuser);
router.get("/refresh", refresher.handlerefreshtoken);

//EMPLOYESS RECORD
router.get("/employee", employee.getallEmployee);
router.get("/:id", employee.getallEmployeeByID);
router.post("/addemploy", employee.createEmployee);
router.put("/updatemploy", employee.updateEmployee);
router.delete("/delemploy", employee.deleteEmployee);

//MONGOOSE
router.post("/addnewuser", mongoregister.handlenewuser);
router.post("/loginusermongo", mongologin.loginuser);

module.exports = router;
