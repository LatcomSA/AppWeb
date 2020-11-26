"use strict";

var express = require('express');

var morgan = require('morgan');

var database = require('./database/database'); //Initialization


var app = express(); //settings

app.set("port", process.env.PORT_TC || 4002); //Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); //Routes

app.use(require("./routes/user"));
app.use(require('dotenv').config); //Starting the server

database.authenticate().then(function () {
  app.listen(app.get('port'), function () {
    console.log("server on port", app.get('port'));
  });
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
module.exports = app;