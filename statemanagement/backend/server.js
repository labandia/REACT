require("dotenv").config();
const routes = require("./routes/index");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connecDB = require("./config/mongo-Conn");

connecDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
//middleware for cookies
app.use(cookieParser());

app.use("/", routes);

// app.listen(process.env.PORT, () => console.log(`Server running on port 5000`));

mongoose.connection.once("open", () => {
   console.log(`Connected to MongoDB`);
   app.listen(process.env.PORT, () =>
      console.log(`Server running on port 5000`)
   );
});
