'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    return {
      user: $window.user,
      isAdmin: function() {
        return $window.user.roles.indexOf('admin') !== -1;
      },
      hasAccess: function(id) {
        return $window.user._id === id;
      }
    };
  }
]);
