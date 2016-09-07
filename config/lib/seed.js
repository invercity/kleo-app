'use strict';

var mongoose = require('mongoose'),
  chalk = require('chalk'),
  crypto = require('crypto');

module.exports.checkUser = () => {
  let User = mongoose.model('User');
  // Add Local Admin
  User.find({username: 'admin'}, (err, users) => {
    if (users.length === 0) {
      let password = crypto.randomBytes(64).toString('hex').slice(1, 20);
      let user = new User({
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
      user.save((err) => {
        if (err) {
          console.log('Seed: Failed to add local admin');
        } else {
          console.log(chalk.bold.red('Seed: Local admin added with password set to ' + password));
        }
      });
    } else {
      console.log('Seed: Admin user exists');
    }
  });
};
