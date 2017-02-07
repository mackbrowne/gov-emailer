import angular from 'angular';
import 'tether/dist/css/tether.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-wizard/dist/angular-wizard.css';
import "../imports/ui/components/emule/agency.css";

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
