// var routes = require('./router');
require('dotenv').config()
var routes = require('./routes/index');

var bodyParser = require('body-parser')
var cors = require('cors');
const express = require('express');

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(cors())


app.use('/', routes);



app.listen(5000, ()=>{
    console.log('Server is live on port', 5000);
})