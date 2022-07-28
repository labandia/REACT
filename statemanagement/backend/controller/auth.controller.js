const userService = require("../services/user.services");
const genPassword = require("../lib/utils").genPassword;
const validatepassword = require("../lib/utils").validatepassword;
const issueJWT = require("../lib/utils").issueJWT;
const authMiddleware = require("../lib/utils").authMiddleware;
const pool = require("../config/mysql-database");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const registerController = async (req, res) => {
   try {
      await userService.addUser(req.body);
      res.json({ success: true, message: "Account successfully created" });
   } catch (error) {}
};

const loginController = async (req, res) => {
   const { username, password } = req.body;

   //CHECK IF THE USERNAME AND PASSWORD IS EMPTy
   if (!username || !password) {
      return res.status(400).json({
         message: "Username and password are required.",
      });
   }

   try {
      const [user] = await pool.query(
         "SELECT *  FROM users WHERE username = ?",
         [username]
      );
      if (!user) return res.sendStatus(401); //Unauthorized

      const isvalid = validatepassword(
         password,
         user[0].hashpassword,
         user[0].salt
      );
      if (isvalid) {
         // create JWTs
         const tokenobject = issueJWT(user[0], process.env.ACCESS_TOKEN);
         const refreshtoken = issueJWT(user[0], process.env.REFRESH_TOKEN);

         res.cookie("jwt", refreshtoken, {
            HttpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
         });

         res.status(200).json({
            success: true,
            user: {
               id: user[0].user_id,
               name: user[0].username,
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
      console.log(error);
      res.status(403).json({ error });
   }
};

const userinfoController = async (req, res) => {
   let id = req.params.id;
   try {
      let [data] = await userService.getUserinfo(id);
      res.json({ success: true, payload: data });
   } catch (error) {}
};

const refreshTokenController = (req, res) => {};

module.exports = {
   registerController,
   loginController,
   refreshTokenController,
   userinfoController,
};
