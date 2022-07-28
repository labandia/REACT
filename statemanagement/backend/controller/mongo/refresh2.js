const User = require("../../data/Accounts");
const jwt = require("jsonwebtoken");

const handlerefreshtoken = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(401);
   const refreshToken = cookies.jwt;
   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) return res.sendStatus(403);

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || foundUser.username !== decoded.username)
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
