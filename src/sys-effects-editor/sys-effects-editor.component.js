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
    this.selectedEffect = null;
    // the root node of the (left) sys effect tree graph
    this.sysGraphEffect = null;
    // the root node of the (right) plant effect tree graph
    this.plantGraphEffect = null;
    this.contextEditorOptions = {
      columnDefs: [
        {
          field: 'title',
          name: 'Related Effects',
          cellTooltip: true,
          cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD CUSTOM_FILTERS}}</div>'
        }
      ],
      data: [],
      onRegisterApi: (gridApi) => {
        this.gridApi = gridApi;
      }
    };
  }

  /**
   * Shall we display the context editor component?
   * @return false, if an element from left or right was selected, true otherwise
   */
  hideContextEditor() {
    return !this.selectedEffect;
  }

  onDrop(scope, event) {
    try {
      let effect = JSON.parse(event.draggable[0].attributes['data-entity'].value);
      if(this.isDropAllowed(effect)) {
        this.contextEditorOptions.data.push(effect);
        // when dropping system effects we have to associate the selected
        // plant effect to the dropped system effect, but the dropped effect
        // is a clone, so we have to search the sysEffects
        if(effect.type == 'sys') {
          let sys = this.service.findEffectById(this.sysEffects, effect.id); 
          sys.related_effects.push(this.selectedEffect);
          this.service.updateSystemEffect(sys);
        } else {
          this.service.updateSystemEffect(this.selectedEffect);
        }
        if(this.sysGraphEffect) {
          this.sysGraphEffect = Object.assign({}, this.sysGraphEffect);
        }
        if(this.plantGraphEffect) {
          this.plantGraphEffect = Object.assign({}, this.plantGraphEffect);
        }
      }
    } catch (e) {
      // this can only happen during development with programming errors
      console.log("Error while trying to extract the dropped effect's data: " + e);
    }
  }

  selectionChanged(row) {
    let effect = row.entity;
    if(row.isSelected) {
      // some effect in one of the items pool components was selected
      this.selectedEffect = effect;
      var relatedEffects = this.findRelatedEffects(effect);
      this.contextEditorOptions.data = relatedEffects;
      // now unselect the other items pool component
      if(effect.type == 'sys') {
        this.unselectPlantEffects = true;
        this.sysGraphEffect = effect;
      } else {
        this.unselectSysEffects = true;
        this.plantGraphEffect = effect;
        // the plant effects graph now correctly shows the related effects
        effect.related_effects = relatedEffects;
      }
    } else {
      // an unselect event
      this.selectedEffect = null;
      this.sysGraphEffect = null;
      this.plantGraphEffect = null;
      this.contextEditorOptions.data = [];
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
    });
  }

  /**
   * Compares the id attribute of the argument effect id to the list of the
   * effects already present in the context editor and returns the effect,
   * if it was found, otherwise undefined.
   */
  findInContextEditor(effect) {
    return this.service.findEffectById(this.contextEditorOptions.data, effect.id);
  }

  /**
   * Returns {false}, when a system effect is currently selected and
   * {effect} is also a system effect.
   *
   * Returns {false}, when a plant effect is currently selected and
   * {effect} is also a plant effect.
   *
   * Returns {false}, when no effect is currently selected.
   *
   * Returns {false}, if {effect} is already among the related effects
   * of the selected effect.
   *
   * In all other cases, returns {true}
   */
  isDropAllowed(effect) {
    if(!this.selectedEffect)
      return false;
    if(effect.type == this.selectedEffect.type)
      return false;

    if(this.findInContextEditor(effect))
      return false;

    return true;
  }

  /**
   * Search the related effects of the argument. This is trivial for
   * the case where the argument is a system effect, as the
   * corresponding plant effects are present in the array
   * effect.related_effects. For plant effects, we have to search the
   * array of system effects and find those system effects which have
   * the argument effect in their related_effects array.
   */
  findRelatedEffects(effect) {
    if(effect.type == 'sys') {
      return effect.related_effects;
    }
    // for plant effects, we have to search the system effects' related_effects
    let result = [];
    for(var sys of this.sysEffects) {
      if (this.service.findEffectById(sys.related_effects, effect.id)) {
        result = result.concat(sys);
        continue;
      }
    }
    return result;
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
