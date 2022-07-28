const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Employeeschema = new schema({
   firstname: {
      type: String,
      require: true,
   },
   lastname: {
      type: String,
      require: true,
   },
});

module.exports = mongoose.model("employees", Employeeschema);
