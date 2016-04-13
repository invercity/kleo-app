'use strict';

angular.module('core').factory('AdminService', [
  function () {
    var adminPages = [
      /*{
        id: 'config',
        state: 'admin.main.mode({moduleId: "config"})',
        title: 'Configuration',
        items: [{
          id: 'menu',
          title: 'Menu'
        }]
      },*/
      {
        id: 'models',
        state: 'admin.models',
        title: 'Models',
        items: []
      }/*, 
      {
        id: 'pages',
        state: 'admin.main.mode({moduleId: "pages"})',
        title: 'Pages',
        items: []
      }*/
    ];

    return {
      getAdminPages: function() {
        return adminPages;
      },
      addModel: function(model) {
        model.state = 'admin.models.item({itemId: "' + model.id + '"})';
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