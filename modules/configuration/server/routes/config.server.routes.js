'use strict';

var config = require('../controllers/config.server.controller');

module.exports = function (app) {

  app.route('/api/config')
    .get(config.list)
    .post(config.create);

  app.route('/api/config/:id')
    .get(config.get);
};
