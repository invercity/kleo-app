'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongoose = require('./mongoose'),
  express = require('./express'),
  pem = require('pem'),
  chalk = require('chalk');

module.exports.loadModels = function loadModels() {
  mongoose.loadModels();
};

// Initialize Models
module.exports.loadModels();

// Seed DB
require('./seed');

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    pem.createCertificate({days: 365, selfSigned: true}, (err, keys) => {
      if (config.secure && config.secure.ssl === true && config.secure.auto === true) {
        if (err || !keys) {
          console.log(chalk.red('Error while creating ssl certificate! SSL mode turned off'));
          config.secure.ssl = false;
        }
        else {
          config.secure.privateKey = keys.serviceKey;
          config.secure.certificate = keys.certificate;
        }
      }
      // Initialize express
      var app = express.init(db);
      if (callback) {
        callback(app, db, config);
      }
    });
  });
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port>
    app.listen(config.port, function () {

      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t\t' + config.port));
      console.log(chalk.green('Database:\t\t\t\t' + config.db.uri));
      if (process.env.NODE_ENV === 'secure') {
        console.log(chalk.green('HTTPs:\t\t\t\ton'));
      }
      console.log('--');

      if (callback) {
        callback(app, db, config);
      }
    });

  });

};
