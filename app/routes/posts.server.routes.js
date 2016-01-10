'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app, router) {
	// Post Routes
	router.route('/posts')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);

	router.route('/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	// Finish by binding the post middleware
	router.param('postId', posts.postByID);
};