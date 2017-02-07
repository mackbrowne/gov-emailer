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

    // Agency Theme JavaScript
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 54)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
      target: '#mainNav',
      offset: 54
    });

    // Closes the Responsive Menu on Menu Item Click
    $('#navbarResponsive>ul>li>a').click(function() {
      $('#navbarResponsive').collapse('hide');
    });

    // jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
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
