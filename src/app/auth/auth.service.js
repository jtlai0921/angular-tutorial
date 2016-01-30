(function() {
  'use strict';

  angular.module('angularTutorial')
    .factory('auth', authFactory);

  function authFactory (firebaseEndpoint) {
    var ref = new Firebase(firebaseEndpoint);

    function isLoggedIn () {
      return !!ref.getAuth();
    }

    return {
      isLoggedIn: isLoggedIn
    };
  }
}());
