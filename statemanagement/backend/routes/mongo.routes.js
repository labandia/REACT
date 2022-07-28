const express = require("express");
const router = express.Router();

//MONGO CONTROLLER
const mongoregister = require("../controller/mongo/registermongo-controller");
const mongologin = require("../controller/mongo/loginmongo.controller");
const refresh = require("../controller/mongo/refresh2");
const employee = require("../controller/mongo/employeemongo.controller");

//MONGOOSE
router.get("/employee", employee.getallEmployee);
router.get("/:id", employee.getallEmployeeByID);
router.post("/addemploy", employee.createEmployee);
router.put("/updatemploy", employee.updateEmployee);
router.delete("/delemploy", employee.deleteEmployee);

router.post("/addnewuser", mongoregister.handlenewuser);
router.post("/loginusermongo", mongologin.loginuser);

router.get("/hello", refresh.handlerefreshtoken);

module.exports = router;
