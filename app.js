// include  basic package 
require("dotenv").config();
//include  the express framework
const { PORT} = process.env;
var express=require('express');

//include route files
const route = require("./routes/index");

var app=express();

//Inculde the route files
app.use("/api/v1/", route);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));