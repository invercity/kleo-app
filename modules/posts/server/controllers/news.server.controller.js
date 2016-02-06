/**
 *
 * KLEO News REST API
 * @version 1.0
 * @author Andriy Ermolenko
 * @license MIT
 *
 */

'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Check if user is admin
 * @param user
 */
var isAdmin = function(user) {
  return user.roles.indexOf('admin') !== -1;
};

/**
 * Create a post/article/announcement
 */
exports.create = function (req, res) {

  if (!isAdmin(req.user)) {
    if (req.body.options.showMain || req.body.options.showGlobal) {
      return res.status(403).send({
        message: 'You need administrator rights to make this action'
      });
    }
  }

  var post = new Post(req.body);
  post.user = req.user;

  post.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};