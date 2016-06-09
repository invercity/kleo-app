'use strict';

let menus = {};

module.exports = {
  addMenu: (id, config) => {
    menus[id] = config;
  },
  addMenuItem: (menuId, config) => {
    if (menus[menuId]) {
      menus[menuId].items || (menus[menuId].items = []);
      menus[menuId].items.push(config);
    }
  }
};