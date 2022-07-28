const User = require("../../data/Accounts");
const validatepassword = require("../../lib/utils").validatepassword;
const issueJWT = require("../../lib/utils").issueJWT;

const loginuser = async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password)
      return res.status(400).json({
         message: "username and password is required ",
      });

   const founduser = await User.findOne({ username: username }).exec();

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
      founduser.refreshToken = refreshToken.token;
      const result = await founduser.save();

      res.json({
         success: true,
         user: {
            name: result.name,
         },
         accesstoken: accessToken,
      });
   } else {
      res.sendStatus(401);
   }
};

module.exports = { loginuser };
