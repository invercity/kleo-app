'use strict';

module.exports = function(app) {
  var upload  = require('../../app/controllers/content.server.controller');


  app.route('/content/:filename')
    .get(upload.read);


  app.route('/content')
    .post(upload.write);
};