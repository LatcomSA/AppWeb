"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var passport = require('passport');

var User = require('../model/User');

var LocalStrategy = require('passport-local').Strategy;

var encrypt = require('../controllers/encrypt');

var Joi = require('joi');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, email, password, done) {
    var schema, _Joi$validate, error, user, validPassword;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Validate if the input data is correct
            schema = {
              email: Joi.string().required().email({
                minDomainAtoms: 2
              }),
              password: Joi.string().min(5).max(255).required().regex(/^[a-zA-Z0-9]{3,30}$/)
            };
            _Joi$validate = Joi.validate(req.body, schema), error = _Joi$validate.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            console.log('data not valido');
            return _context.abrupt("return", done(null, false, req.flash('message', 'The input data is not correct')));

          case 5:
            _context.next = 7;
            return User.findOne({
              where: {
                email: email
              },
              attributes: ['user_id', 'name', 'lastname', 'email', 'password']
            });

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            console.log('This account does not exist: Incorrect email or password.');
            return _context.abrupt("return", done(null, false, req.flash('This account does not exist: Incorrect email or password.')));

          case 13:
            _context.next = 15;
            return encrypt.matchPassword(password, user.password);

          case 15:
            validPassword = _context.sent;

            if (validPassword) {
              console.log('welcome ' + user.name + ' ' + user.lastname);
              done(null, user, req.flash('success', 'welcome ' + user.name + ' ' + user.lastname));
            } else {
              console.log('password incorrect');
              done(null, false, req.flash('message', 'Incorrect Password'));
            }

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));
passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});
passport.deserializeUser( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              where: {
                user_id: id
              }
            });

          case 2:
            user = _context2.sent;
            done(null, user);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());