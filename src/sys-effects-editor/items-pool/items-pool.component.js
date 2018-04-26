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
          cellTemplate: '<div class="ui-grid-cell-contents" data-drag="true" jqyoui-draggable="{animate:true}">Haha: {{COL_FIELD CUSTOM_FILTERS}}</div>',
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

    console.log("data: " + this.data);
  }

  $onChanges(changes) {
    console.log("changes: " + JSON.stringify(changes));
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
