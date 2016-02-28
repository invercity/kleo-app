'use strict';

angular.module('core').directive('sidebar', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/templates/sidebar.client.html',
      restrict: 'E',
      scope: {
        tabs: '='
      },
      link: function(scope, element, attrs) {

      }
    };
  }
]);