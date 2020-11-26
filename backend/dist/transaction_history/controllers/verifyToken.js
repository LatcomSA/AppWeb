"use strict";

var jwt = require('jsonwebtoken');

var config = require('../config/config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  }

  var decoded = jwt.verify(token, config.secret);
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;