(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController ($state, auth) {
    if (auth.isLoggedIn()) {
      $state.go('home.emptyChat');
      return;
    }

    var vm = this;
    vm.registerAndLogin = function() {
      delegateToAuth('registerAndLogin');
    }
    vm.login = function() {
      delegateToAuth('login');
    }
    function delegateToAuth (methodName) {
      auth[methodName](vm.email, vm.password, vm.name)
        .then(function() {
          $state.go('home.emptyChat');
        })
        .catch(function(err) {
          vm.errorMessage = err.message;
        })
    }
  }
}());
