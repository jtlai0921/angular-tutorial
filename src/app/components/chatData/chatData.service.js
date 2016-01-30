(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_, firebaseRef, $firebaseArray, auth) {
    var users, messages;
    messages = [];

    function getNow () {
      return new Date().getTime();
    }

    function chatIdWith (uid) {
      return [uid, auth.getUid()].sort().reverse().join('---');
    }
    var currentUserId = null;

    users = $firebaseArray(firebaseRef.child('users'));
    users.$loaded().then(function(users) {
      if (users.length) {
        toReturn.setCurrent(users[0].uid);
      }
    })

    var toReturn = {
      getUsers: function() {
        return users;
      },
      getMessages: function() {
        return messages;
      },
      setCurrent: function setCurrent(uid) {
        if ( _.find(users, function(u) { return u.uid === uid }) ) {
          currentUserId = uid;
          messages = $firebaseArray(firebaseRef.child('messages')
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
