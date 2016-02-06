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

/**
 * Update a post/article/announcement
 */
exports.update = function (req, res) {

  if (req.body.postType) req.body.postType = undefined;

  if (!isAdmin(req.user)) {
    if (req.body.options.showMain || req.body.options.showGlobal) {
      return res.status(403).send({
        message: 'You need administrator rights to make this action'
      });
    }
    // need to test... may unset 'options' flags
    req.body.options = undefined;
  }

  var post = req.post;
  post = _.extend(post, req.body);

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

/**
 * Delete a post/news/announcement
 */
exports.delete = function (req, res) {
  var post = req.post;

  post.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * List of all types posts/news/announcements
 */
exports.list = function (req, res) {
  Post.find().sort('-created').populate('user', 'displayName').exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

/**
 * Get selected post/news/announcement by ID
 */
exports.postByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Post is invalid'
    });
  }

  Post.findById(id).populate('user', 'displayName').exec(function (err, post) {
    if (err) {
      return next(err);
    } else if (!post) {
      return res.status(404).send({
        message: 'No post with that identifier has been found'
      });
    }
    req.post = post;
    next();
  });
};