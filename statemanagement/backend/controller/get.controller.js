const pool = require("../config/mysql-database");

const getclasses = async (req, res) => {
   const id = req.params.id;

   const [user] = await pool.query(
      "SELECT * FROM enrolledsubj_tbl WHERE studnum_fld = ?",
      [id]
   );

   if (!user) return res.sendStatus(409);

   try {
      const [data] = await pool.query(
         "SELECT *, (SELECT empcode_fld from personnel_tbl WHERE email_fld=classes_tbl.email_fld) AS empcode_fld,(SELECT fname_fld from personnel_tbl WHERE email_fld=classes_tbl.email_fld) AS fname_fld, (SELECT lname_fld from personnel_tbl WHERE email_fld=classes_tbl.email_fld) AS lname_fld, (SELECT profilepic_fld from personnel_tbl WHERE email_fld=classes_tbl.email_fld) AS profilepic_fld FROM enrolledsubj_tbl INNER JOIN classes_tbl USING(classcode_fld)  WHERE studnum_fld = ? AND enrolledsubj_tbl.ay_fld=? AND enrolledsubj_tbl.sem_fld= ? AND enrolledsubj_tbl.isdeleted_fld = 0",
         [user[0].studnum_fld, user[0].ay_fld, user[0].sem_fld]
      );
      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getpost = async (req, res) => {
   const classcode = req.params.classcode;
   try {
      const [data] = await pool.query(
         "SELECT *, IFNULL((SELECT profilepic_fld FROM students_tbl WHERE studnum_fld=classpost_tbl.authorid_fld), (SELECT profilepic_fld FROM personnel_tbl WHERE empcode_fld=classpost_tbl.authorid_fld)) AS profilepic_fld, IFNULL((SELECT CONCAT(fname_fld,' ',lname_fld) FROM students_tbl WHERE studnum_fld=classpost_tbl.authorid_fld), (SELECT CONCAT(fname_fld,' ',lname_fld) FROM personnel_tbl WHERE empcode_fld=classpost_tbl.authorid_fld))AS fullname_fld,	(SELECT COUNT(commentcode_fld) FROM classcomments_tbl WHERE actioncode_fld = classpost_tbl.postcode_fld AND isdeleted_fld = 0) AS commentcount FROM classpost_tbl WHERE classcode_fld= ? AND isdeleted_fld=0 ORDER BY datetime_fld DESC",
         [classcode]
      );

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getcomment = async (req, res) => {
   const actioncode = req.params.actioncode;
   try {
      const [data] = await pool.query(
         "SELECT *, IFNULL((SELECT profilepic_fld FROM students_tbl WHERE studnum_fld=classcomments_tbl.authorid_fld),(SELECT profilepic_fld FROM personnel_tbl WHERE empcode_fld=classcomments_tbl.authorid_fld)) AS profilepic_fld, IFNULL((SELECT CONCAT(fname_fld,' ', lname_fld) FROM students_tbl WHERE studnum_fld=classcomments_tbl.authorid_fld), (SELECT CONCAT(fname_fld,' ', lname_fld) FROM personnel_tbl WHERE empcode_fld=classcomments_tbl.authorid_fld))  AS fullname_fld FROM classcomments_tbl WHERE actioncode_fld= ? AND isdeleted_fld = 0 ORDER BY datetime_fld DESC",
         [actioncode]
      );

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getmembers = async (req, res) => {
   const { classcode, ay, sem } = req.body;

   try {
      const [student] = await pool.query(
         "SELECT studnum_fld, fname_fld, lname_fld, mname_fld, email_fld, extname_fld, sex_fld, dept_fld, program_fld, contactnum_fld, profilepic_fld FROM enrolledsubj_tbl LEFT JOIN students_tbl USING(studnum_fld) WHERE classcode_fld=? AND enrolledsubj_tbl.ay_fld=? AND enrolledsubj_tbl.sem_fld=? AND isenrolled_fld = 1 ORDER BY lname_fld",
         [classcode, ay, sem]
      );

      const [teacher] = await pool.query(
         "SELECT empcode_fld, fname_fld, lname_fld, mname_fld, extname_fld, email_fld, personnel_tbl.dept_fld, profilepic_fld,  email_fld  FROM classes_tbl LEFT JOIN personnel_tbl USING(email_fld) WHERE classcode_fld=? AND ay_fld=? AND sem_fld=? LIMIT 1",
         [classcode, ay, sem]
      );

      // if (!student || !teacher) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         students: student,
         teachers: teacher,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getresources = async (req, res) => {
   const classcode = req.params.classcode;
   try {
      const [data] = await pool.query(
         "SELECT * FROM resource_tbl WHERE classcode_fld = ? AND isdeleted_fld=0",
         [classcode]
      );

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getactivity = async (req, res) => {
   const { studnum_fld, classcode_fld } = req.body;

   const studid = "%" + studnum_fld + "%";
   try {
      const [data] = await pool.query(
         "SELECT *, (SELECT COUNT(commentcode_fld) FROM classcomments_tbl WHERE actioncode_fld = activity_tbl.actcode_fld AND isdeleted_fld = 0) AS commentcount FROM activity_tbl WHERE recipient_fld LIKE ? AND classcode_fld=? AND isdeleted_fld=0 ORDER BY datetime_fld DESC",
         [studid, classcode_fld]
      );

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const getannouncement = async (req, res) => {
   try {
      const [data] = await pool.query("SELECT * FROM announcements_tbl");

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

module.exports = {
   getclasses,
   getannouncement,
   getpost,
   getcomment,
   getmembers,
   getresources,
   getactivity,
};
