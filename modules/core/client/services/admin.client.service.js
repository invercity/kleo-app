'use strict';

angular.module('core').factory('AdminService', [
  function () {
    var adminPages = [
      {
        id: 'models',
        title: 'Models',
        items: []
      }, {
        id: 'pages',
        title: 'Pages',
        items: []
      }
    ];

    return {
      getAdminPages: function() {
        return adminPages;
      },
      addModel: function(model) {
        adminPages[0].items.push(model);
      },
      getModel: function(modelId) {
        return _.find(adminPages[0].items, function(model) {
          return model.id === modelId;
        });
      }
    };
  }
]);