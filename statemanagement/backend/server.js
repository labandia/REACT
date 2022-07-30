require("dotenv").config();
const routes = require("./routes/index");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const credentials = require("./middleware/credienital");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(credentials);
app.use(cors(corsOptions));
//middleware for cookies
app.use(cookieParser());

app.use("/", routes);

app.listen(process.env.PORT, () => console.log(`Server running on port 5000`));
