'use strict';

var mongoose = require('mongoose'),
  errorHandler = require('../errors.server.controller'),
  User = mongoose.model('User'),
  _ = require('lodash');

/**
 * List of Users
 */
exports.list = function(req, res) {
  User.find().exec(function(err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load user ' + id));
    req.user = user;
    next();
  });
};