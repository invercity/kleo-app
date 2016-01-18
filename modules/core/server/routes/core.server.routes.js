'use strict';

var version = require('../../../../package.json').version;

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Return static data on api call
  app.route('/api').get(function(req, res) {
    res.json({
      version: version
    });
  });

  // Define application route
  app.route('/*').get(core.renderIndex);
};
