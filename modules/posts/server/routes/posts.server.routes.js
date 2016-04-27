'use strict';

/**
 * Module dependencies.
 */
var postsPolicy = require('../policies/posts.server.policy'),
  posts = require('../controllers/posts.server.controller');

module.exports = function (app) {
  // News routes
  app.route('/api/news').all(postsPolicy.isAllowed)
    .get(posts.getTopPostsForType);
  // Posts collection routes
  app.route('/api/posts').all(postsPolicy.isAllowed)
    .get(posts.list)
    .post(posts.create);

  // Single post routes
  app.route('/api/posts/:postId').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.update)
    .delete(posts.delete);

  app.route('/api/users/:userId/feed').all(postsPolicy.isAllowed)
    .get(posts.getPostsForUser);
  
  //tags
  app.route('/api/tags')
      .get(posts.getTags);

  // Finish by binding the post middleware
  app.param('postId', posts.postByID);
};
