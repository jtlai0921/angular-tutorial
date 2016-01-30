(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController ($state, auth) {
    if (auth.isLoggedIn()) {
      $state.go('home');
      return;
    }

    var vm = this;
    vm.submit = function() {
      auth.registerAndLogin(vm.email, vm.password, vm.name)
        .then(function() {
          $state.go('home');
        })
        .catch(function(err) {
          vm.errorMessage = err;
        })
    }
  }
}());
