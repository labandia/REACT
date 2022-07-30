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

const getannouncement = async (req, res) => {
   try {
      const [data] = await pool.query("SELECT * FROM announcements_tbl", [id]);

      if (!data) return res.sendStatus(404);

      res.status(200).json({
         success: true,
         payload: data,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

module.exports = { getclasses, getannouncement };
