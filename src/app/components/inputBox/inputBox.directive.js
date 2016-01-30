(function() {
  'use strict'

  angular.module('angularTutorial')
    .directive('inputBox', inputBoxDirective);


  function inputBoxDirective () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/inputBox/inputBox.html',
      controller: 'InputBoxController',
      controllerAs: 'inputBoxController'
    }
  }
}());
