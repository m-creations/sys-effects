import angular from 'angular';

let services = angular.module('app.services', []);

import SysEffectsService from './syseffects.service';
services.service('SysEffectsService', SysEffectsService);

export default services;
