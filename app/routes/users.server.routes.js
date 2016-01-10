'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app, router) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users profile api
	router.route('/users/me').get(users.me);

	router.route('/users')
		.put(users.update)
		.get(users.list);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	router.route('/users/password').post(users.changePassword);
	router.route('/auth/forgot').post(users.forgot);
	router.route('/auth/reset/:token').get(users.validateResetToken);
	router.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	router.route('/auth/signup').post(users.signup);
	router.route('/auth/signin').post(users.signin);
	router.route('/auth/signout').get(users.signout);

	// Setting the facebook oauth routes
	router.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	router.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	router.route('/auth/twitter').get(passport.authenticate('twitter'));
	router.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	router.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	router.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	router.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	router.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Setting the github oauth routes
	router.route('/auth/github').get(passport.authenticate('github'));
	router.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	router.param('userId', users.userByID);
};