(function() {
  'use strict';

  angular.module('angularTutorial')
    .factory('auth', authFactory);

  function authFactory (firebaseEndpoint, $firebaseAuth) {
    var ref = new Firebase(firebaseEndpoint);
    window.ref = ref;

    function isLoggedIn () {
      return !!ref.getAuth();
    }

    function registerAndLogin (email, password, name) {
      var auth = $firebaseAuth(ref);
      var params = { email: email, password: password };

      var promise = auth.$createUser(params)
                    .then(function(authData) {
                      return auth.$authWithPassword(params);
                    })
                    .then(function(authData) {
                      return ref.child('users').child(authData.uid).set({ name: name })
                    });
      return promise;
    }

    return {
      isLoggedIn: isLoggedIn,
      registerAndLogin: registerAndLogin
    };
  }
}());
