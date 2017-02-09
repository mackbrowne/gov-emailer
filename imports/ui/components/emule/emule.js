import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import angularWizard from 'angular-wizard';

import template from './emule.html';
import { name as Home } from '../home/home';
import { name as Todo } from '../todo/todo';
import { name as Navigation } from '../navigation/navigation';


import { name as MPService } from '../../services/mpService';
import { name as ProvinceService } from '../../services/provinceService';

class Emule {}

const name = 'emule';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Home,
  Todo,
  Navigation,
  MPService,
  ProvinceService,
  'accounts.ui',
  'mgo-angular-wizard'
]).component(name, {
  template,
  controllerAs: name,
  controller: Emule
})
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('home');
      }
    }
  );
}
