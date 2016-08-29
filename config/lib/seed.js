'use strict';

var mongoose = require('mongoose'),
  chalk = require('chalk'),
  crypto = require('crypto'),
  User = mongoose.model('User');

// Add Local Admin
User.find({username: 'admin'}, function (err, users) {
  if (users.length === 0) {
    var password = crypto.randomBytes(64).toString('hex').slice(1, 20);
    var user = new User({
      username: 'admin',
      password: password,
      provider: 'local',
      email: 'admin@localhost.com',
      firstName: 'Admin',
      lastName: 'Local',
      displayName: 'Admin Local',
      roles: ['user', 'admin']
    });
    // Then save the user
    user.save(function (err) {
      if (err) {
        console.log('Failed to add local admin');
      } else {
        console.log(chalk.bold.red('Local admin added with password set to ' + password));
      }
    });
  } else {
    console.log('Admin user exists');
  }
});
