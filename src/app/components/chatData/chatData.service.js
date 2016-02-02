(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_, firebaseRef, $firebaseArray, auth, $stateParams, $rootScope) {
    var users, messages;
    messages = [];

    function getNow () {
      return new Date().getTime();
    }

    function chatIdWith (uid) {
      return [uid, auth.getUid()].sort().reverse().join('---');
    }
    var currentUserId = $stateParams.uid;

    var deregister = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams){
      if (toState.name === 'home.chat') {
        toReturn.setCurrent(toParams.uid);
      }
    });
    $rootScope.$on('$destroy', deregister);

    users = $firebaseArray(firebaseRef.child('users'));
    users.$loaded().then(function(users) {
      if (users.length) {
        toReturn.setCurrent(users[0].uid);
      }
    });

    function findUser (uid) {
      return _.find(users, function(u) { return u.uid === uid });
    }

    var toReturn = {
      getUsers: function() {
        return users;
      },
      getMessages: function() {
        return messages;
      },
      setCurrent: function setCurrent(uid) {
        if ( findUser(uid) ) {
          currentUserId = uid;
          messages = $firebaseArray(firebaseRef.child('messages')
                                           .child(chatIdWith(currentUserId)));
        }
      },
      getCurrentUser: function() {
        return findUser(currentUserId);
      },

      sendChat: function(message) {
        if (!currentUserId) {
          return;
        }
        messages.$add({
          content: message,
          sentAt: getNow(),
          sender: auth.getUid(),
          receiver: currentUserId
        });
      }
    };
    return toReturn;
  }
}());
