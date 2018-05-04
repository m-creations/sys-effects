// (c) 2018 m-creations GmbH - All rights reserved

import template from './items-pool.html';
import style from './items-pool.scss';


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

  selectCallback(row) {
    row.grid.appScope.onSelectionChanged({ row: row });
  }

  /**
   * @return {undefined} undefined
   */
  $onInit () {
    let $ctrl = this;
    this.gridApi = null;
    this.gridOptions = {
      appScopeProvider: $ctrl,
      columnDefs: [
        {
          field: this.displayAttribute,
          name: this.title || '',
          // helper: 'clone' -> the original row remains in place
          // appendTo: 'body' -> append the (cloned) element which is dragged
          // to the body element, otherwise the element hides behind all
          // page elements other than the original container
          // data-entity is used to transport the entity row to the parent
          // controller (cf. onDrop)
          cellTemplate: '<div class="ui-grid-cell-contents draggable" data-drag="true" jqyoui-draggable="{ index: {{rowRenderIndex}}, animate: true}" data-entity="{{row.entity}}" data-jqyoui-options="{ helper: \'clone\', appendTo: \'body\', opacity: 0.35, distance: 10 }" >{{COL_FIELD CUSTOM_FILTERS}}</div>',
          cellTooltip: function(row, col) {
            return row.entity.notes;
          }
        }
      ],
      data: this.data || [],
      onRegisterApi: (gridApi) => {
        this.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged(null, this.selectCallback);
      },
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      enableSelectAll: false,
      multiSelect: false
    };
  }

  $doCheck() {
    if(this.unselectRows) {
      // do we have any selection to clear?
      if(this.gridApi && this.gridApi.selection.getSelectedCount() > 0) {
        this.gridApi.selection.clearSelectedRows();
      }
      // in any case, reset to false
      this.unselectRows = false;
    }
  }

  $onChanges(changes) {
    if(this.gridOptions && changes.data && changes.data.currentValue) {
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
    unselectRows: '=',
    onSelectionChanged: '&'
  },
  template: template,
  controller: ItemsPoolController
};
