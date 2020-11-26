const express = require('express');
const morgan = require('morgan');
const database = require('./database/database');


//Initialization
const app = express();


//settings
app.set("port", process.env.PORT_TI || 4003);

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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