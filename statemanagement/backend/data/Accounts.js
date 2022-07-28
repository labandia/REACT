const mongoose = require("mongoose");
const schema = mongoose.Schema;

const useschema = new schema({
   username: {
      type: String,
      require: true,
   },
   hashpassword: String,
   salt: String,
   name: String,
   role: Number,
   refreshToken: String,
});

module.exports = mongoose.model("accounts", useschema);
