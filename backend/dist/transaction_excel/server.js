"use strict";

var express = require('express');

var morgan = require('morgan');

var database = require('./database/database');

var json2xls = require('json2xls'); //Initialization


var app = express(); //settings

app.set("port", process.env.PORT_TE || 4006); //Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(json2xls.middleware); //Routes

app.use(require("./routes/user")); //Starting the server

database.authenticate().then(function () {
  app.listen(app.get('port'), function () {
    console.log("server on port", app.get('port'));
  });
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
module.exports = app;