import 'jquery';
import 'jquery-ui';

import 'es6-shim';

import 'webpack-jquery-ui/draggable';
import 'webpack-jquery-ui/droppable';

import angular from 'angular';
import uiGrid from 'angular-ui-grid';
import 'angular-dragdrop/src/angular-dragdrop.js';

import {SystemEffectsEditor} from './sys-effects-editor/sys-effects-editor.component.js';
import {EffectGraph} from './effect-graph/effect-graph.component.js';
import {services} from './services';


/**
 * @class Has fields addValue and fancyValue. Manages state between superAwesomeComponents
 */
class IndexController {
  constructor () {
    this.addValue = 3;
    this.fancyValue = 1337;
  }
}

angular.module('app', [ uiGrid, 'ui.grid.selection', 'ngDragDrop', 'app.services', 'app.sys-effects-editor' ])
  .component('systemEffectsEditor', SystemEffectsEditor)
  .component('effectGraph', EffectGraph)
  .controller('IndexController', IndexController);
