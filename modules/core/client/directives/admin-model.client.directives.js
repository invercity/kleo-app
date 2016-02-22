'use strict';

angular.module('core').directive('adminModuleModel', ['$filter', 'AdminService',
  function($filter, Admin) {
    return {
      templateUrl: 'modules/core/client/views/templates/admin-module-model.client.html',
      restrict: 'E',
      scope: {
        model: '='
      },
      link: function(scope, element, attrs) {

        scope.isArray = angular.isArray;

        scope.pagedItems = [];
        scope.itemsPerPage = 10;
        scope.currentPage = 1;

        scope.$watch('model', function(id) {
          var modelObj = Admin.getModel(id);
          if (modelObj) {
            modelObj.model.query(function(items) {
              scope.items = items;
              scope.options = modelObj.options;
              scope.figureOutItemsToDisplay();
            });
          }
        });

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
      }
    };
  }
]);