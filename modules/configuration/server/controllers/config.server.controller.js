'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    path = require('path'),
    Config = mongoose.model('Config'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function(req, res) {
  res.send('Not implemented');
};

exports.get = function(req, res) {
  res.send('Not implemented');
};

exports.list = function(req, res) {
  res.send('Not implemented');
};