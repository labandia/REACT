// THIS CODE IS FOR FILE TXT UPDATE

const userDB = {
   users: require("../../data/accounts.json"),
   setUsers: function (data) {
      this.users = data;
   },
};

require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const validatepassword = require("../../lib/utils").validatepassword;
const issueJWT = require("../../lib/utils").issueJWT;
const jwt = require("jsonwebtoken");

const loginuser = async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password)
      return res.status(400).json({
         message: "username and password is required ",
      });

   const founduser = userDB.users.find(
      (person) => person.username === username
   );

   if (!founduser) res.sendStatus(409); // Unauthorized

   const isvalid = validatepassword(
      password,
      founduser.hashpassword,
      founduser.salt
   );
   if (isvalid) {
      const accessToken = issueJWT(founduser, true);
      const refreshToken = issueJWT(founduser, false);

      res.cookie("jwt", refreshToken.token, {
         httpOnly: true,
         sameSite: "None",
         secure: false,
         maxAge: 24 * 60 * 60 * 1000,
      });

      //save refreshtoken with the current user
      const otherusers = userDB.users.filter(
         (person) => person.username !== founduser.username
      );
      const currentuser = { ...founduser, refreshToken };
      userDB.setUsers([...otherusers, currentuser]);

      await fsPromises.writeFile(
         path.join(__dirname, "../..", "data", "accounts.json"),
         JSON.stringify(userDB.users, null, 3)
      );

      res.json({
         success: true,
         user: {
            id: founduser.user_id,
            name: founduser.name,
         },
         accesstoken: accessToken,
      });
   } else {
      res.sendStatus(401);
   }
};

module.exports = { loginuser };
