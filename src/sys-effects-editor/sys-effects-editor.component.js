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
    this.sysEffects = [];
    this.plantEffects = [];
    this.unselectSysEffects = false;
    this.unselectPlantEffects = false;
    this.relatedEffects = [];
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

  onDrop(scope, event) {
    try {
      let options = eval('(' + event.draggable[0].attributes['jqyoui-draggable'].value + ')');
      let effect = JSON.parse(event.draggable[0].attributes['data-entity'].value);
      // TODO: check whether element is already present in the data array
      this.contextEditorOptions.data.push(effect);

      // unselect everything
      this.unselectSysEffects = true;
      this.unselectPlantEffects = true;
      
    } catch (e) {
      // this can only happen during development with programming errors
      console.log("Error while trying to extract the dropped effect's data: " + e);
    }
  }

  onDelete () {
    console.log('onDelete');
  }

  /**
   * Announces that input bindings are defined
   * @return {undefined} undefined
   */
  $onInit () {
    console.log('$onInit of SysEffectsEditorController');
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
