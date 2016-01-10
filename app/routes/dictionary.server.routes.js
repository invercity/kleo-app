'use strict';

var dictionaries = require('../../app/controllers/dictionary.server.controller');

module.exports = function(app, router) {
  router.route('/dictionary')
    .get(dictionaries.list);

  router.route('/dictionary/:dictId')
    .get(dictionaries.getById);

  router.param('dictId', dictionaries.getById);
};