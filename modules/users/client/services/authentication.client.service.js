'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user,
      isAdmin: function() {
        return this.user && this.user.roles.indexOf('admin') !== -1;
      },
      hasAccess: function(id) {
        return this.user && this.user._id === id;
      },
      setUser: function(user) {
        this.user = user;
      }
    };
    return auth;
  }
]);
