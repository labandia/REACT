// THIS CODE IS FOR FILE TXT UPDATE

const userDB = {
   users: require("../../data/accounts.json"),
   setUsers: function (data) {
      this.users = data;
   },
};

const fsPromises = require("fs").promises;
const path = require("path");
const genPassword = require("../../lib/utils").genPassword;
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res) => {
   const { username, password, name } = req.body;

   if (!username || !password || !name)
      return res.status(400).json({
         message: "all field need to be filled ",
      });

   const duplicate = userDB.users.find(
      (person) => person.username === username
   );

   console.log(duplicate);

   if (duplicate) res.sendStatus(409); // CHECK IF USERS EXIST

   try {
      const genhash = genPassword(password);

      //store a new users

      const newusers = {
         user_id: uuidv4(),
         username: username,
         hashpassword: genhash.hash,
         salt: genhash.salt,
         name: name,
      };

      userDB.setUsers([...userDB.users, newusers]);

      //to overwrite a store a new data
      await fsPromises.writeFile(
         path.join(__dirname, "../..", "data", "accounts.json"),
         JSON.stringify(userDB.users)
      );

      res.status(201).json({
         message: "new user created",
         users: userDB.users,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = { addUser };
