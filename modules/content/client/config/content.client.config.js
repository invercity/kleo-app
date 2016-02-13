'use strict';

// Configuring the Content module
angular.module('content').run(['Menus', 'AdminService', 'Content',
  function (Menus, Admin, Content) {

    Admin.addModel({
      id: 'content',
      title: 'Content',
      model: Content,
      options: {
        title: 'name',
        subtitle: 'user',
        other: 'created',
        route: 'content.view',
        modelId: 'contentId'
      }
    });
  }
]);