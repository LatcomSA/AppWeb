"use strict";

var express = require('express');

var _require = require("../controllers/auth"),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

var router = express.Router();

var passport = require('passport');

router.get('/signup', function (req, res) {
  res.send('Welcome to abc, Sign Up to start win points');
});
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/failure',
  failureFlash: false
}));
router.get('/profile', function (req, res) {
  res.send('This is your abc Profile');
});
router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/signup");
});
router.get("/failure", function (req, res) {
  res.send('Ya se encuentra registrado');
});
module.exports = router;