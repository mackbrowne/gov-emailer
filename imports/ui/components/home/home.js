import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import jquery from 'jquery';
import jqueryEasing from 'jquery.easing';
import tether from 'tether';
import bootstrap from 'bootstrap';

//import jsonMP from '../../../../public/parliment.json';

import template from './home.html';

class Home {
  constructor($scope, $reactive, mpService, provinceService) {
    'ngInject';

    $reactive(this).attach($scope);

    this.mps = mpService.mps;
    this.selectedMPS = [];


    this.derp = "Meow" ;



    this.provinces = provinceService.provinces.map((province) => {
      return {
        name: province,
        selected: false
      }
    });

    let parties = [
      'Liberal',
      'NDP',
      'Conservative',
      'Green'
    ];

    this.selectedParties = parties.map((party) => {
      return {
        name: party,
        selected: false
      }
    });



  }

  select(item) {
    item.selected = !item.selected;
  }

  selectAll(list) {
    list.forEach((item) => {
      this.select(item)
    });
  }

  isSelected(list, name){
    let isIncluded = false;
    list.filter((listItem)=>{
      return listItem.selected === true;
    }).forEach((item)=>{
      if(item.name === name){
        isIncluded = true;
      }
    });
    return isIncluded;
  }

  generateMPS() {
    this.selectedMPS = this.mps.filter((mp)=>{
      if( this.isSelected(this.provinces ,mp.province) && this.isSelected(this.selectedParties, mp.party) ){
        return true;
      }else{
        return false;
      }
    });
  }

  getEmails() {
    return this.selectedMPS.map((mp)=>{
      return mp.email;
    }).toLocaleString();
  }
}

const name = 'home';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ]).component(name, {
    template,
    controllerAs: name,
    controller: Home
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    });
}
