'use strict';

angular.module('core').directive('adminModelManager', ['$filter',
  function($filter) {
    return {
      templateUrl: 'modules/core/client/views/templates/admin-model.client.html',
      restrict: 'E',
      scope: {
        items: '=',
        options: '='
      },
      link: function(scope, element, attrs) {
        scope.pagedItems = [];
        scope.itemsPerPage = 15;
        scope.currentPage = 1;

        scope.figureOutItemsToDisplay = function () {
          scope.filteredItems = $filter('filter')(scope.items, {
            $: scope.search
          });
          scope.filterLength = scope.filteredItems.length;
          var begin = ((scope.currentPage - 1) * scope.itemsPerPage);
          var end = begin + scope.itemsPerPage;
          scope.pagedItems = scope.filteredItems.slice(begin, end);
        };

        scope.pageChanged = function () {
          scope.figureOutItemsToDisplay();
        };

        scope.pageRoute = function(id) {
          return scope.options.route + '({' + scope.options.modelId + ': ' + id + '})';
        };

        scope.figureOutItemsToDisplay();
      }
    };
  }
]);