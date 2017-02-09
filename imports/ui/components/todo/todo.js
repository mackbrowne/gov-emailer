import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './todo.html';

class Todo {
  constructor($scope, $reactive ) {
    'ngInject';

    $reactive(this).attach($scope);
  }
}

const name = 'todo';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ]).component(name, {
    template,
    controllerAs: name,
    controller: Todo
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('todo', {
      url: '/todoapp',
      template: '<todo></todo>'
    });
}
