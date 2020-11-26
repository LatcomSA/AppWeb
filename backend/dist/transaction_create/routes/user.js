"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var Transaction = require('../model/Transaction');

var User = require('../model/User');

var Joi = require('joi');

var router = express.Router();

var verifyToken = require('../controllers/verifyToken');

router.post('/transaction/create', verifyToken, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var schema, _Joi$validate, error, user, transaction;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Validate if the input data is correct
            schema = {
              value: Joi.number().min(0).required(),
              points: Joi.number().min(0).required()
            };
            _Joi$validate = Joi.validate(req.body, schema), error = _Joi$validate.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).send(error.details[0].message));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return User.findOne({
              where: {
                user_id: req.userId
              }
            });

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(404).send('No user found'));

          case 10:
            _context.next = 12;
            return Transaction.create({
              user_id: req.userId,
              created_date: new Date(),
              value: req.body.value,
              points: req.body.points
            });

          case 12:
            transaction = _context.sent;
            res.json({
              error: false,
              transaction: transaction
            });
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            res.status(500).json({
              error: true,
              message: 'Error: Could not created the transaction!'
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;