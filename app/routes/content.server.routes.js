'use strict';

module.exports = function(app, router) {
  var upload  = require('../../app/controllers/content.server.controller');

  router.route('/content/:filename')
    .get(upload.read);

  router.route('/content')
    .post(upload.write);
};