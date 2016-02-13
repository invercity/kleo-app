'use strict';

var content = require('../controllers/content.server.controller');

module.exports = function (app) {

  app.route('/api/content')
    .get(content.list)
    .post(content.write);

  app.route('/api/content/:id')
    .get(content.read);
};
