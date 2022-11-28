const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
require('dotenv/config');
const authRoute = require('./routes/auth');
const userRoute = require("./routes/users");
const deviceRoute = require("./routes/devices");
const sensorRoute = require("./routes/sensors");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//Router
app.use('/auth', authRoute);
app.use("/users", userRoute);
app.use("/devices", deviceRoute);
app.use("/sensors", sensorRoute);




//Cau hinh cho mongodb
const DATABASE_URL = process.env.DB_CONNECTION;
const DATABASE_CONNECT_OPTION = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}; 

//Tao noi ket den mongodb
mongoose.connect(DATABASE_URL, DATABASE_CONNECT_OPTION);

//Kiem tra ket noi den mongodb
mongoose.connection.on("connected", function (){
    console.log("Connected to database");

});
mongoose.connection.on("disconnected", function(){
    console.log("Can not connect to database");

});

app.get('/', (req,res) =>{
    res.send('Hello');
});

app.listen(27017);

