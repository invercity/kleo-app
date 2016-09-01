/**
 *
 * KLEO Default REST API
 * @version 1.0
 * @author Andriy Ermolenko
 * @license MIT
 *
 */

'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.api = (modelName) => {
  let Model = mongoose.model(modelName);
  return {
    update: (options) => (req, res) => {
      let item = req.body._id ? _.extend(req.item, req.body) : new Model(req.body);
      item.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(item);
        }
      });
    },
    middleware: (options) => (req, res, next, id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'ID is invalid'
        });
      }

      Model.findById(id).exec(function (err, item) {
        if (err) {
          return next(err);
        } else if (!item) {
          return res.status(404).send({
            message: 'No item with that identifier has been found'
          });
        }
        req.item = item;
        next();
      });
    },
    get: (options) => (req, res) => {
      return res.send(req.item);
    },
    delete: (options) => (req, res) => {
      let item = req.item;

      item.remove(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(item);
        }
      });
    },
    all: (options) => (req, res) => {
      Model.find().sort('-created').exec(function (err, items) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(items);
        }
      });
    }
  };
};