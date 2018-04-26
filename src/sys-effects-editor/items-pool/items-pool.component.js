// (c) 2018 m-creations GmbH - All rights reserved

import template from './items-pool.html';
import style from './items-pool.css';


/**
 * @class Controller class which has the following responsibilities:
 *
 * <ul>
 * <li>show a list of items
 * <li>allow for searching the items
 * </ul>
 * TODO: complete docs
 */

class ItemsPoolController {

  /**
   * @return {undefined} undefined
   */
  constructor ($scope) {
    this.$scope = $scope;
  }

  /**
   * @return {undefined} undefined
   */
  doSuperThings () {
    console.log('doing super things');
    this.someOutput({value: fancyFunction(this.someInput, 3)});
  }

  /**
   * @return {undefined} undefined
   */
  $onInit () {
    this.gridApi = null;
    this.gridOptions = {
      columnDefs: [
        {
          field: this.displayAttribute,
          name: (this.title === undefined ? '' : this.title),
          // helper: 'clone' -> the original row remains in place
          // appendTo: 'body' -> append the (cloned) element which is dragged
          // to the body element, otherwise the element hides behind all
          // page elements other than the original container
          // data-entity is used to transport the entity row to the parent
          // controller (cf. onDrop)
          cellTemplate: '<div class="ui-grid-cell-contents draggable" data-drag="true" jqyoui-draggable="{ index: {{rowRenderIndex}}, animate: true}" data-entity="{{row.entity}}" data-jqyoui-options="{ helper: \'clone\', appendTo: \'body\' }" >{{COL_FIELD CUSTOM_FILTERS}}</div>',
          cellTooltip: function(row, col) {
            return row.entity.notes;
          }
        }
      ],
      data: (this.data === undefined ? [] : this.data),
      onRegisterApi: (gridApi) => {
        this.gridApi = gridApi;
      }
    };
  }

  $onChanges(changes) {
    if(this.gridOptions !== undefined && changes.data !== undefined && changes.data.currentValue !== undefined) {
      this.gridOptions.data = changes.data.currentValue;
    }
  }

}

/**
 * @class Shows a searchable list of selectable system or plant effects.
 */

export const ItemsPool = {
  bindings: {
    data: '<',
    title: '<',
    displayAttribute: '<',
    tooltipAttribute: '<',
    selected: '&'
  },
  template: template,
  controller: ItemsPoolController
};
