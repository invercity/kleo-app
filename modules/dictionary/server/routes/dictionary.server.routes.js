'use strict';

var dictionaries = require('../controllers/dictionary.server.controller');

module.exports = function(app) {
  app.route('/api/dictionary')
    .get(dictionaries.list);

  app.route('/api/dictionary/:dictId')
    .get(dictionaries.getById);

  app.param('dictId', dictionaries.getById);
};