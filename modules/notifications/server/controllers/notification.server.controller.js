'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Notification = mongoose.model('Notification'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a notification
 */
exports.create = function (req, res) {
  var notification = new Notification(req.body);

  notification.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(notification);
    }
  });
};

/**
 * List of Notification
 */
exports.list = function (req, res) {
  Notification.find().exec(function (err, notifications) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(notifications);
    }
  });
};