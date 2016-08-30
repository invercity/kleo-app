'use strict';

angular.module('core').directive('kuiPostDetails', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/kui/post-details.client.html',
      restrict: 'E',
      scope: {
        post: '='
      }
    };
  }
]);