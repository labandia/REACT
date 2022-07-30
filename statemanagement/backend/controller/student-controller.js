const genPassword = require("../lib/utils").genPassword;
const validatepassword = require("../lib/utils").validatepassword;
const issueJWT = require("../lib/utils").issueJWT;
const jwt = require("jsonwebtoken");
const pool = require("../config/mysql-database");

const studenlogin = async (req, res) => {
   const { username, password } = req.body;

   //CHECK IF THE USERNAME AND PASSWORD IS EMPTy
   if (!username || !password) {
      return res.status(400).json({
         message: "Username and password are required.",
      });
   }

   try {
      const [user] = await pool.query(
         "SELECT accounts_tbl.*, students_tbl.* FROM accounts_tbl INNER JOIN students_tbl on accounts_tbl.studnum_fld = students_tbl.studnum_fld WHERE students_tbl.email_fld = ?",
         [username]
      );
      if (!user) return res.sendStatus(409); //Unauthorized

      const isvalid = validatepassword(
         password,
         user[0].hashpassword,
         user[0].salt
      );
      if (isvalid) {
         // create JWTs
         const tokenobject = issueJWT(user[0], true);
         const refreshtoken = issueJWT(user[0], false);

         await pool.query(
            "UPDATE accounts_tbl SET refreshtoken = ? WHERE studnum_fld = ?",
            [refreshtoken.token, user[0].studnum_fld]
         );

         res.cookie("jwt", refreshtoken.token, {
            HttpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
         });

         res.status(200).json({
            success: true,
            user: {
               id: user[0].studnum_fld,
               name: user[0].fname_fld,
               email: user[0].email_fld,
            },
            token: tokenobject.token,
         });
      } else {
         res.status(401).json({
            success: false,
            msg: "You entered the wrong password",
         });
      }
   } catch (error) {
      res.status(403).json({ error });
   }
};

const updatestudent = async (req, res) => {
   const { password, id } = req.body;
   const genhash = genPassword(password);
   const sql =
      "UPDATE accounts_tbl SET hashpassword = ?, salt=? WHERE studnum_fld = ?";
   await pool.query(sql, [genhash.hash, genhash.salt, id]);
   res.status(200).json({
      success: true,
      message: "UPDATE SUCCESSFUL",
   });
};

const getstudetaccount = async (req, res) => {
   try {
      const [user] = await pool.query(
         "SELECT accounts_tbl.*, students_tbl.* FROM accounts_tbl INNER JOIN students_tbl on accounts_tbl.studnum_fld = students_tbl.studnum_fld"
      );
      res.status(200).json({
         success: true,
         payload: user,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const refreshtoken = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies) return res.sendStatus(401);

   const refreshToken = cookies.jwt;

   const [user] = await pool.query(
      "SELECT accounts_tbl.*, students_tbl.*  FROM accounts_tbl INNER JOIN students_tbl on accounts_tbl.studnum_fld = students_tbl.studnum_fld WHERE accounts_tbl.refreshtoken = ?",
      [refreshToken]
   );

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || user[0].fname_fld !== decoded.name) return res.sendStatus(401);

      const accessToken = jwt.sign(
         { name: user.fname_fld },
         process.env.ACCESS_TOKEN,
         { expiresIn: "1d" }
      );

      res.json({ accesstoken: accessToken });
   });
};

const handleLogout = async (req, res) => {
   // On client, also delete the accessToken

   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(204); //No content
   const refreshToken = cookies.jwt;

   const [user] = await pool.query(
      "SELECT accounts_tbl.*, students_tbl.* FROM accounts_tbl INNER JOIN students_tbl on accounts_tbl.studnum_fld = students_tbl.studnum_fld WHERE accounts_tbl.studnum_fld = ?",
      [req.params.id]
   );

   if (!user) {
      res.clearCookie("jwt", {
         httpOnly: true,
         sameSite: "None",
         secure: true,
      });
      return res.sendStatus(204);
   }

   refreshToken = "";

   let result = await pool.query(
      "UPDATE accounts_tbl SET refreshtoken = ? WHERE studnum_fld = ?",
      [refreshToken, user[0].studnum_fld]
   );

   // Delete refreshToken in db
   console.log(result);

   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
   res.sendStatus(204);
};

module.exports = {
   updatestudent,
   studenlogin,
   getstudetaccount,
   refreshtoken,
   handleLogout,
};
