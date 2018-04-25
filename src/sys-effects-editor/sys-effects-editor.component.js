// (c) 2018 m-creations GmbH - All rights reserved

import 'bootstrap/dist/css/bootstrap.css';
import 'angular-ui-grid/ui-grid.css';

import {ItemsPool} from './items-pool/items-pool.component.js';
let module = angular.module('app.sys-effects-editor', []);
module.component('itemsPool', ItemsPool);

import template from './sys-effects-editor.html';

import style from './sys-effects-editor.scss';

// import {SysEffectsEditorController} from './sys-effects-editor.controller.js';
/**
 * @class Controller class which has the following responsibilities:
 *
 * <ul>
 * <li>upon intialisation, retrieve the list of effects from backend
 * <li>TBC
 * </ul>
 */

class SysEffectsEditorController {
  /**
   * Announces that input bindings aren't defined
   * @return {undefined} undefined
   */
  constructor (SysEffectsService) {
    this.service = SysEffectsService;
    this.relatedEffects = [
    ];
    this.contextEditorOptions = {
      columnDefs: [
        {
          field: 'title',
          name: 'Related Effects',
          cellTooltip: true
        }
      ],
      cellTemplate: '<div class="ui-grid-cell-contents">Haha: {{COL_FIELD CUSTOM_FILTERS}}</div>',
      data: []
    };
  }

  /**
   * Shall we display the context editor component?
   * @return true, if an element from left or right was selected, false otherwise
   */
  hideContextEditor() {
    return ! this.contextEditorOptions.data.length;
  }

  /**
   * Calls someOutput with the value of someInput put in fancyFunction
   * @return {undefined} undefined
   */
  doSuperThings () {
    console.log('doing super things');
    this.someOutput({value: fancyFunction(this.someInput, 3)});
  }

  onDelete () {
    console.log('onDelete');
  }

  /**
   * Announces that input bindings are defined
   * @return {undefined} undefined
   */
  $onInit () {
    this.service.retrieveEffects().then(result => {
      this.sysEffects = result.sysEffects;
      this.plantEffects = result.plantEffects;
      console.log('input bindings are defined!', this.sysEffects[0]);
    });
  }
}

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
    selected: '&'
  },

  template: template,

  controller: SysEffectsEditorController
};
