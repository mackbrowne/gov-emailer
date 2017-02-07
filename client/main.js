import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';

import { Meteor } from 'meteor/meteor';

import { name as Emule } from '../imports/ui/components/emule/emule';

function onReady() {
  angular.bootstrap(document, [
    Emule
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
