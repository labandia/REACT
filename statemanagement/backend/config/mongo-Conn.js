const mongoose = require("mongoose");

const connecDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODBURL, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      });
   } catch (err) {
      console.log(err);
   }
};

module.exports = connecDB;
