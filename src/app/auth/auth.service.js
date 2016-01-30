(function() {
  'use strict';

  angular.module('angularTutorial')
    .factory('auth', authFactory);

  /** @ngInject */
  function authFactory (firebaseRef, $firebaseAuth) {
    var ref = firebaseRef

    function isLoggedIn () {
      return !!ref.getAuth();
    }

    function registerAndLogin (email, password, name) {
      var auth = $firebaseAuth(ref);
      var params = { email: email, password: password };

      var promise = auth.$createUser(params)
                    .then(function() {
                      return auth.$authWithPassword(params);
                    })
                    .then(function(authData) {
                      return ref.child('users').child(authData.uid).set({ name: name })
                    });
      return promise;
    }

    function login (email, password, name) {
      var auth = $firebaseAuth(ref);
      var params = { email: email, password: password };

      var promise = auth.$authWithPassword(params)
                        .then(function(authData) {
                          return ref.child('users').child(authData.uid).set({ name: name })
                        });
      return promise;
    }

    return {
      isLoggedIn: isLoggedIn,
      registerAndLogin: registerAndLogin,
      login: login
    };
  }
}());
