// (c) 2018 m-creations GmbH - All rights reserved

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
    console.log('input bindings arent defined!', this.someInput);
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

export { SysEffectsEditorController }
