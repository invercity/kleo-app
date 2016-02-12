'use strict';

var content = require('../controllers/content.server.controller');

module.exports = function (app) {

  app.route('/api/content')
    .post(content.write);

  app.route('/api/content/:contentId')
    .get(content.current);

  app.param('contentId', content.read);
};
