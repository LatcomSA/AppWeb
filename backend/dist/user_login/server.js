"use strict";

var express = require('express');

var morgan = require('morgan');

var session = require('express-session');

var MySQLStore = require('express-mysql-session');

var database = require('./database/database');

var passport = require('passport');

var flash = require('connect-flash'); //Initialization


var app = express();

require('./controllers/passport'); //settings


app.set("port", process.env.PORT_UL || 4001); //Middlewares

app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'abc-db'
  })
}));
app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Global Variables

app.use(function (req, res, next) {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
}); //Routes

app.use(require("./routes/user")); //Starting the server

database.authenticate().then(function () {
  app.listen(app.get('port'), function () {
    console.log("server on port", app.get('port'));
  });
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
module.exports = app;