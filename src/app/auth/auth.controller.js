(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('AuthController', AuthController);

  function AuthController ($state, auth) {
    var vm = this;
    vm.submit = function() {
      auth.registerAndLogin(vm.email, vm.password, vm.name)
        .then($state.go('home'))
        .catch(function(err) {
          console.log('error!', err);
        })
    }
  }
}());
