'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var chalk = require('chalk');

module.exports = function() {
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
        password: 'admin',
        email: 'admin@kleo.com',
        roles: [adminRole._id]
      });

      adminUser.save(function(err) {
        if (!err) {
          chalk.green('Models initialized successfully');
        }
        else {
          chalk.red('Error while initializing User model');
        }
      })
    }
    else {
      chalk.red('Error while initializing Role model');
    }
  });
};