// (c) 2018 m-creations GmbH - All rights reserved

import template from './items-pool.html';
import style from './items-pool.css';
import {ItemsPoolController} from './items-pool.controller.js';

/**
 * @class Shows a searchable list of selectable system or plant effects.
 */

export const ItemsPool = {
  bindings: {
    data: '<',
    title: '<',
    selected: '&'
  },
  template: template,
  controller: ItemsPoolController
};
