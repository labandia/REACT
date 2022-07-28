const express = require("express");
const routes = require("./routes/index");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route(routes);

app.listen(5000, () => {
   console.log("Server is live on port", 5000);
});
