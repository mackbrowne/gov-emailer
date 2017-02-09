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


if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
