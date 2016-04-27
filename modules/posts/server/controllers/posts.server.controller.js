/**
 *
 * KLEO Posts REST API
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
    if (req.body.showMain || req.body.showGlobal) {
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
 * Show the current post
 */
exports.read = function (req, res) {
  res.json(req.post);
};

/**
 * Update a post/article/announcement
 */
exports.update = function (req, res) {

  if (!isAdmin(req.user)) {
    if ((undefined !== req.body.showMain && req.body.showMain !== req.post.showMain) ||
      (undefined !== req.body.showGlobal && req.body.showGlobal !== req.post.showGlobal)) {
      return res.status(403).send({
        message: 'You need administrator rights to make this action'
      });
    }
  }

  var post = req.post;

  post = _.extend(post, req.body);

  post.save(function(err, post) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
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

/**
 * Get top post of selected type for main page
 * @param req
 * @param res
 */
exports.getTopPostsForType = function(req, res) {
  var type = req.query.type;
  var limit = req.query.limit;
  var searchObject = {
    //domain: null,
    showGlobal: true
  };
  if (type) {
    searchObject.postType = type;
  }
  var query = Post.find(searchObject)
    .sort('-created');
  if (limit) query = query.limit(limit);
  query
    .populate('user', 'displayName')
    .exec(function(err, posts) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(posts);
      }
    });
};

exports.getPostsForUser = function(req, res) {
  var user = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).send({
      message: 'User ID is invalid'
    });
  }
  var type = req.query.type;
  var searchObject = {
    user: user
  };
  if (type) {
    searchObject.postType = type;
  }
  var query = Post.find(searchObject)
    .sort('-created');
  query
    .populate('user', 'displayName')
    .exec(function(err, posts) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(posts);
      }
    });
};

exports.getTags = function(req, res) {
  var q = req.query.q;
  Post.find().exec(function(err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var tags = [];
      _.each(posts, function(post) {
        if (post.tags && post.tags.length) {
          _.each(post.tags, function(tag) {
            if (tag.name.indexOf(q) !== -1) tags.push(tag);
          });
        }
      });
      res.json({
        status: 'success',
        data: tags
      });
    }
  });
};