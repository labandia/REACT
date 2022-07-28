const userService = require("../services/user.services");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const registerController = async (req, res) => {
   const { username, password, options, fname, lname } = req.body;
   try {
      await userService.addUser(username, password, options, fname, lname);
      res.json({ success: true, message: "User Created" });
   } catch (error) {
      res.status(400).json({ error });
   }
};

const loginController = async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await userService.checkUser(username, password);

      const accessToken = jwt.sign({ ...user }, secretKey, { expiresIn: "1h" });
      // const refreshToken = jwt.sign({ ...user }, secretKey, {
      //    expiresIn: "7d",
      // });
      // res.cookie("refreshToken", refreshToken, {
      //    maxAge: 5 * 60 * 1000,
      //    httpOnly: true,
      // });
      res.json({
         success: true,
         token: accessToken,
         id: user.userId,
         role: user.role,
      });
   } catch (error) {
      // res.status(403).json({ error });
      res.json("ERROR MESSAGE HERE");
   }
};

const refreshTokenController = (req, res) => {
   try {
      const { refreshToken } = req.cookies;
      const decoded = jwt.verify(refreshToken, secretKey);

      const accessToken = jwt.sign(
         { userId: decoded.user_id, username: decoded.username },
         secretKey,
         { expiresIn: "1h" }
      );

      res.json({ accessToken });
   } catch (error) {
      console.log(error);
      res.status(403).json({ error });
   }
};

module.exports = {
   registerController,
   loginController,
   refreshTokenController,
};
