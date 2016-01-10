'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Post = mongoose.model('Post'),
	_ = require('lodash');

/**
 * Create a post
 */
exports.create = function(req, res) {
	var post = new Post(req.body);
	post.user = req.user;

	post.save(function(err) {
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
exports.read = function(req, res) {
	res.json(req.post);
};

/**
 * Update a post
 */
exports.update = function(req, res) {
	var post = req.post;

	post = _.extend(post, req.body);

	post.save(function(err) {
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
 * Delete a post
 */
exports.delete = function(req, res) {
	var post = req.post;

	post.remove(function(err) {
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
 * List of Posts
 */
exports.list = function(req, res) {
	Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts) {
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
 * Post middleware
 */
exports.postByID = function(req, res, next, id) {
	Post.findById(id).populate('user', 'displayName').exec(function(err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('Failed to load post ' + id));
		req.post = post;
		next();
	});
};

/**
 * Post authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	// will be replaced with role checking ..
	/*if (req.post.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}*/
	next();
};