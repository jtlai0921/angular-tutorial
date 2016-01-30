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
                        ref.child('users')
                          .child(authData.uid)
                          .set({ name: name || email, uid: authData.uid })
                    });
      return promise;
    }

    function login (email, password, name) {
      var auth = $firebaseAuth(ref);
      var params = { email: email, password: password };

      var promise = auth.$authWithPassword(params)
                        .then(function(authData) {
                          if (name) {
                            ref.child('users')
                              .child(authData.uid)
                              .set({ name: name, uid: authData.uid })
                          }
                        });
      return promise;
    }

    function getUid () {
      if ( isLoggedIn() ) {
        return firebaseRef.getAuth().uid;
      } else {
        return null;
      }
    }

    return {
      isLoggedIn: isLoggedIn,
      registerAndLogin: registerAndLogin,
      login: login,
      getUid: getUid
    };
  }
}());
