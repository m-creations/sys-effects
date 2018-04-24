// (c) 2018 m-creations GmbH - All rights reserved

import 'bootstrap/dist/css/bootstrap.css';
import 'angular-ui-grid/ui-grid.css';

import {ItemsPool} from './items-pool/items-pool.component.js';
let module = angular.module('app.sys-effects-editor', []);
module.component('itemsPool', ItemsPool);

import template from './sys-effects-editor.html';

import style from './sys-effects-editor.css';

import {SysEffectsEditorController} from './sys-effects-editor.controller.js';

/**
 * @class Component for creating many to many relations between system
 * and plant effects. The upper part consists of three components:
 *
 * <ul>
 * <li>a list of all system effects to the left
 * <li>a list of all plant effects to the right
 * <li>middle list which shows the related list of effects of the currently selected element
 * </ul>
 *
 * The lower part shows two horizontal trees which show the
 * connections of the selected effect.
 */

export const SystemEffectsEditor = {

  bindings: {
    sysEffects: '<',
    plantEffects: '<',
    selected: '&'
  },

  template: template,

  controller: SysEffectsEditorController
};
