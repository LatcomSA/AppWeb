"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var _require = require("../controllers/auth"),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

var router = express.Router();

var jwt = require('jsonwebtoken');

var config = require('../config/config');

var passport = require('passport');

router.get('/signin', function (req, res) {
  res.send('Welcome to abc, Sign In to continue win points');
});
router.post('/signin', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            passport.authenticate('local.signin', /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, user, info) {
                var error;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;

                        if (!(err || !user)) {
                          _context2.next = 4;
                          break;
                        }

                        error = new Error('An Error occurred');
                        return _context2.abrupt("return", next(error));

                      case 4:
                        req.login(user, {
                          session: false
                        }, /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
                            var token;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    if (!error) {
                                      _context.next = 2;
                                      break;
                                    }

                                    return _context.abrupt("return", next(error));

                                  case 2:
                                    token = jwt.sign({
                                      id: user.user_id
                                    }, config.secret, {
                                      expiresIn: 60 * 60 * 24
                                    });
                                    return _context.abrupt("return", res.json({
                                      token: token
                                    }));

                                  case 4:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x7) {
                            return _ref3.apply(this, arguments);
                          };
                        }());
                        _context2.next = 10;
                        break;

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return", next(_context2.t0));

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 7]]);
              }));

              return function (_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }())(req, res, next);

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/profile', function (req, res) {
  res.send('This is your abc Profile');
});
router.get("/logout", isLoggedIn, function (req, res) {
  req.logOut();
  res.redirect("/signin");
});
module.exports = router;