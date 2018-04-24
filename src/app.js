import angular from 'angular';
import uiGrid from 'angular-ui-grid';

import {theComponent} from './superAwesomeComponent/theComponent.js';
import {SystemEffectsEditor} from './sys-effects-editor/sys-effects-editor.component.js';
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


angular.module('app', [ uiGrid, 'app.services', 'app.sys-effects-editor' ])
  .component('superAwesomeComponent', theComponent)
  .component('systemEffectsEditor', SystemEffectsEditor)
  .controller('IndexController', IndexController);
