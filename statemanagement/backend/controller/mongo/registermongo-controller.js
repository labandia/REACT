const User = require("../../data/Accounts");

const genPassword = require("../../lib/utils").genPassword;
const { v4: uuidv4 } = require("uuid");

const handlenewuser = async (req, res) => {
   const { username, password, name } = req.body;

   if (!username || !password || !name)
      return res.status(400).json({
         message: "all field need to be filled ",
      });

   const duplicate = await User.findOne({ username: username }).exec();

   if (duplicate) res.sendStatus(409); // CHECK IF USERS EXIST

   try {
      const genhash = genPassword(password);

      //store a new users

      const result = await User.create({
         username: username,
         hashpassword: genhash.hash,
         salt: genhash.salt,
         role: 0,
         name: name,
      });

      res.status(201).json({
         message: "new user created",
         users: result.name,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = { handlenewuser };
