const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const student = require("../controller/student-controller");
const getdata = require("../controller/get.controller");
const postobj = require("../controller/post.controller");

const verifytoken = require("../middleware/utils").authMiddleware;

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      // directory path
      const dir = `uploads/student/${req.params.id}`;

      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir);
      }
      cb(null, dir);
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
   },
});

const upload = multer({
   storage: storage,
});

//AUTHENTICATION
router.get("/accounts", student.getstudetaccount);
router.get("/refresh", student.refreshtoken);
router.post("/updatepassword", student.updatestudent);
router.post("/studentlogin", student.studenlogin);

//CLASSES
// router.use(verifytoken);
router.get("/getclasses/:id", getdata.getclasses);
router.get("/getpost/:classcode", getdata.getpost);
router.get("/getcomments/:actioncode", getdata.getcomment);
router.get("/resources/:classcode", getdata.getresources);

//GET DATA USING POST
router.post("/getmembers", getdata.getmembers);
router.post("/getactivity", getdata.getactivity);

//SUBMIT data
router.post("/uploads/:id", upload.array("file[]"), postobj.uploadfiles);
router.post("/posdata", postobj.classpost);

//NEWS
router.get("/getnews", getdata.getannouncement);

module.exports = router;
