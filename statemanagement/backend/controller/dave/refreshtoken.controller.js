// THIS CODE IS FOR FILE TXT UPDATE

const userDB = {
   users: require("../../data/accounts.json"),
   setUsers: function (data) {
      this.users = data;
   },
};

require("dotenv").config();
const jwt = require("jsonwebtoken");

const handlerefreshtoken = (req, res) => {
   const cookies = req.cookies;

   if (!cookies) return res.sendStatus(401);

   const refreshToken = cookies.jwt;

   const founduser = userDB.users.find(
      (person) => person.refreshToken?.token === refreshToken
   );

   if (!founduser) res.sendStatus(403); // Forbidden

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      console.log(decoded);
      if (err || founduser.username !== decoded.username)
         return res.sendStatus(401);

      const accessToken = jwt.sign(
         { username: decoded.username },
         process.env.ACCESS_TOKEN,
         { expiresIn: "30s" }
      );

      res.json({ accesstoken: accessToken });
   });
};

module.exports = { handlerefreshtoken };
