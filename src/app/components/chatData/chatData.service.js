(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_, $rootScope, firebaseRef, $firebaseArray, auth) {
    var $scope = $rootScope.$new();

    function getNow () {
      return new Date().getTime();
    }

    function chatIdWith (uid) {
      return [uid, auth.getUid()].sort().reverse().join('---');
    }
    var currentUserId = null;

    $scope.users = $firebaseArray(firebaseRef.child('users'));
    $scope.users.$loaded().then(function(users) {
      if (users.length) {
        toReturn.setCurrent(users[0].uid);
      }
    })
    $scope.messages = [];

    var toReturn = {
      getUsers: function() {
        return $scope.users;
      },
      getMessages: function() {
        return $scope.messages;
      },
      setCurrent: function setCurrent(uid) {
        if ( _.find($scope.users, function(u) { return u.uid === uid }) ) {
          currentUserId = uid;
          $scope.messages = $firebaseArray(firebaseRef.child('messages')
                                           .child(chatIdWith(currentUserId)));
        }
      },
      getCurrent: function() {
        return currentUserId;
      },

      sendChat: function(message) {
        if (!currentUserId) {
          return;
        }
        $scope.messages.$add({
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
