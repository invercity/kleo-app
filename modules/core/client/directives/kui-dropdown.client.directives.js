'use strict';

angular.module('core').directive('kuiDropdown', [
  function() {
    return {
      templateUrl: 'modules/core/client/views/kui/dropdown.client.html',
        restrict: 'E',
        scope: {
          title: '=',
          items: '='
        }
      };
    }
]);