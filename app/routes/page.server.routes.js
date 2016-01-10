'use strict';

module.exports = function(app, router) {
	router.route('/pages')
    .get(function(req, res) {
      res.json('All OK!');
    })
};