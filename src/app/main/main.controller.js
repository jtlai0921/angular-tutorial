(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, auth) {
    if (!auth.isLoggedIn()) {
      $state.go('auth');
      return;
    }
  }
})();
