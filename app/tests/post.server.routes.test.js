'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Post'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, post;

/**
 * Post routes tests
 */
describe('Post CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new post
		user.save(function() {
			post = {
				title: 'Post Title',
				content: 'Post Content'
			};

			done();
		});
	});

	it('should be able to save an post if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new post
				agent.post('/posts')
					.send(post)
					.expect(200)
					.end(function(postSaveErr, postSaveRes) {
						// Handle post save error
						if (postSaveErr) done(postSaveErr);

						// Get a list of posts
						agent.get('/posts')
							.end(function(postsGetErr, postsGetRes) {
								// Handle post save error
								if (postsGetErr) done(postsGetErr);

								// Get posts list
								var posts = postsGetRes.body;

								// Set assertions
								(posts[0].user._id).should.equal(userId);
								(posts[0].title).should.match('Post Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save a post if not logged in', function(done) {
		agent.post('/posts')
			.send(post)
			.expect(401)
			.end(function(postSaveErr, postSaveRes) {
				// Call the assertion callback
				done(postSaveErr);
			});
	});

	it('should not be able to save a post if no title is provided', function(done) {
		// Invalidate title field
		post.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new post
				agent.post('/posts')
					.send(post)
					.expect(400)
					.end(function(postSaveErr, postSaveRes) {
						// Set message assertion
						(postSaveRes.body.message).should.match('Title cannot be blank');
						
						// Handle post save error
						done(postSaveErr);
					});
			});
	});

	it('should be able to update an post if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new post
				agent.post('/posts')
					.send(post)
					.expect(200)
					.end(function(postSaveErr, postSaveRes) {
						// Handle post save error
						if (postSaveErr) done(postSaveErr);

						// Update post title
						post.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing post
						agent.put('/posts/' + postSaveRes.body._id)
							.send(post)
							.expect(200)
							.end(function(postUpdateErr, postUpdateRes) {
								// Handle post update error
								if (postUpdateErr) done(postUpdateErr);

								// Set assertions
								(postUpdateRes.body._id).should.equal(postSaveRes.body._id);
								(postUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of posts if not signed in', function(done) {
		// Create new post model instance
		var postObj = new Post(post);

		// Save the post
		postObj.save(function() {
			// Request posts
			request(app).get('/posts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single post if not signed in', function(done) {
		// Create new post model instance
		var postObj = new Post(post);

		// Save the post
		postObj.save(function() {
			request(app).get('/posts/' + postObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', post.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete a post if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new post
				agent.post('/posts')
					.send(post)
					.expect(200)
					.end(function(postSaveErr, postSaveRes) {
						// Handle post save error
						if (postSaveErr) done(postSaveErr);

						// Delete an existing post
						agent.delete('/posts/' + postSaveRes.body._id)
							.send(post)
							.expect(200)
							.end(function(postDeleteErr, postDeleteRes) {
								// Handle post error error
								if (postDeleteErr) done(postDeleteErr);

								// Set assertions
								(postDeleteRes.body._id).should.equal(postSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete a post if not signed in', function(done) {
		// Set post user
		post.user = user;

		// Create new post model instance
		var postObj = new Post(post);

		// Save the post
		postObj.save(function() {
			// Try deleting post
			request(app).delete('/posts/' + postObj._id)
			.expect(401)
			.end(function(postDeleteErr, postDeleteRes) {
				// Set message assertion
				(postDeleteRes.body.message).should.match('User is not logged in');

				// Handle post error error
				done(postDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Post.remove().exec();
		done();
	});
});