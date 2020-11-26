"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var passport = require('passport');

var User = require('../model/User');

var LocalStrategy = require('passport-local').Strategy;

var encrypt = require('../controllers/encrypt');

var jwt = require('jsonwebtoken');

var config = require('../config/config');

var Joi = require('joi');

var md5 = require('md5');

passport.use('local.signup', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, name, password, done) {
    var user, schema, _Joi$validate, error, exists_user, UserId, newUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.body; // Validate if the input data is correct

            schema = {
              name: Joi.string().min(3).max(50).required().alphanum(),
              lastname: Joi.string().min(3).max(50).required().alphanum(),
              birth_date: Joi.date().required(),
              email: Joi.string().required().email({
                minDomainAtoms: 2
              }),
              password: Joi.string().min(5).max(255).required().regex(/^[a-zA-Z0-9]{3,30}$/)
            };
            _Joi$validate = Joi.validate(user, schema), error = _Joi$validate.error;

            if (!error) {
              _context.next = 6;
              break;
            }

            console.log('the input data is not correct');
            return _context.abrupt("return", done(null, false, req.flash('message', 'The input data is not correct')));

          case 6:
            _context.next = 8;
            return User.findOne({
              where: {
                email: user.email
              }
            });

          case 8:
            exists_user = _context.sent;

            if (!exists_user) {
              _context.next = 12;
              break;
            }

            console.log('The user with email: ' + user.email + ' already exists. Try with another email.');
            return _context.abrupt("return", done(null, false, req.flash('The user with email: ' + user.email + ' already exists. Try with another email.')));

          case 12:
            // Create the new user
            UserId = md5(user.email);
            _context.t0 = User;
            _context.t1 = UserId;
            _context.t2 = new Date();
            _context.t3 = name;
            _context.t4 = user.lastname;
            _context.t5 = user.birth_date;
            _context.t6 = user.email;
            _context.next = 22;
            return encrypt.encryptPassword(password);

          case 22:
            _context.t7 = _context.sent;
            _context.t8 = {
              user_id: _context.t1,
              created_date: _context.t2,
              name: _context.t3,
              lastname: _context.t4,
              birth_date: _context.t5,
              email: _context.t6,
              password: _context.t7
            };
            _context.next = 26;
            return _context.t0.create.call(_context.t0, _context.t8);

          case 26:
            newUser = _context.sent;
            token = jwt.sign({
              id: UserId
            }, config.secret, {
              expiresIn: 60 * 60 * 24
            });
            console.log('The user was created: welcome ' + user.name + ' ' + user.lastname);
            console.log({
              token: token
            });
            return _context.abrupt("return", done(null, newUser));

          case 31:
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