'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var chalk = require('chalk');

module.exports = function(cb) {
  var adminRole = new Role({
    name: 'admin',
    displayName: 'Admin',
    permissions: {
      admin: true
    }
  });

  adminRole.save(function(err) {
    if (!err) {
      var adminUser = new User({
        provider: 'local',
        firstName: 'admin',
        lastName: 'admin',
        displayName: 'admin',
        username: 'admin',
        password: 'admin123',
        email: 'admin@kleo.com',
        roles: [adminRole._id]
      });

      adminUser.save(function(err) {
        if (!err) {
          chalk.green('Models initialized successfully');
          cb(true);
        }
        else {
          chalk.red('Error while initializing User model');
          cb();
        }

      })
    }
    else {
      chalk.red('Error while initializing Role model');
      cb();
    }
  });
};