const express = require('express');
const morgan = require('morgan');
const database = require('./database/database');
const json2xls = require('json2xls');


//Initialization
const app = express();


//settings
app.set("port", process.env.PORT_TE || 4006);

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(json2xls.middleware);

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