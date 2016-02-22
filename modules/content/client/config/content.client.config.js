'use strict';

// Configuring the Content module
angular.module('content').run(['Menus', 'AdminService', 'Content',
  function (Menus, Admin, Content) {

    Admin.addModel({
      id: 'content',
      title: 'Content',
      model: Content,
      options: {
        name: {
          title: 'File ID',
          value: 'fileId'
        },
        fields: [
          {
            title: 'User',
            value: ['user', 'displayName']
          },
          {
            title: 'Created',
            value: 'created'
          }
        ],
        route: 'content.view',
        modelId: 'contentId'
      }
    });
  }
]);