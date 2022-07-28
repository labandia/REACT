const bcrypt = require("bcryptjs");
const pool = require("../config/mysql-database");
const genPassword = require("../lib/utils").genPassword;
const validatepassword = require("../lib/utils").validatepassword;
const issueJWT = require("../lib/utils").issueJWT;
const authMiddleware = require("../lib/utils").authMiddleware;

const addUser = async (user) => {
   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(user.password, salt);

   // INSERT the users information
   await pool.query("INSERT INTO users SET ?", {
      username: user.username,
      password: hashPassword,
   });

   // GET the users
   const [users, _] = await pool.query(
      "SELECT user_id FROM users WHERE username = ?",
      [user.username]
   );
   const id = users[0];

   return await pool.query("INSERT INTO userinfo SET ?", {
      user_id: id.user_id,
      address: user.address,
      city: user.city,
      fullname: user.fullname,
      post_code: user.post_code,
      country: user.country,
      telephone: user.telephone,
      mobile: user.mobile,
   });
};

const checkUser = async (username, password) => {
   const [users, _] = await pool.query(
      "SELECT user_id, username, password FROM users WHERE username = ?",
      [username]
   );

   const user = users[0];

   const isPasswordMatched = bcrypt.compareSync(password, user.password);

   if (!isPasswordMatched) {
      throw new Error("Password is not correct");
   }

   return { userId: user.user_id, username };
};

const getUserinfo = async (id) => {
   let sql = "SELECT * FROM userinfo WHERE user_id = ?";
   return await pool.query(sql, [id]);
};

module.exports = {
   addUser,
   checkUser,
   getUserinfo,
};
