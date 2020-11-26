const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const database = require('./database/database');
const passport = require('passport');
const flash = require('connect-flash');

//Initialization
const app = express();
require('./controllers/passport');

//settings
app.set("port", process.env.PORT_UR || 4000);

//Middlewares
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
      host:'localhost',
      user: 'root',
      password: '',
      database: 'abc-db'
    })
}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require("./routes/user"));

//Starting the server
database.authenticate()
  .then(() => {
    
    app.listen(app.get('port'), () => {
      console.log("server on port", app.get('port'));
    });
    
  })
  .catch((err) => {
     console.error('Unable to connect to the database:', err);
  });

  module.exports = app;