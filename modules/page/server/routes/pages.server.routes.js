'use strict';

/**
 * Module dependencies.
 */
var apiBuilder = require('../../../core/server/controllers/default.server.controller'),
  api = apiBuilder.api('Page');

module.exports = function (app) {

  app.route('/api/pages/:pageId')
    .get(api.get())
    .put(api.update())
    .delete(api.delete());

  app.route('/api/pages')
    .get(api.all())
    .post(api.update());

  // Binding the page middleware
  app.param('pageId', api.middleware());
};
