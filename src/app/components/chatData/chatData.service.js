(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_) {
    var users, messages;
    var messagePool;
    var currentUserId = null;

    users = _.map([1,2,3,4,5], function(id) {
      return {
        uid: 'the-user-id-' + id,
        name: 'the-name-of-user-' + id
      }
    });
    messagePool = {};
    _.each(users, function(u) {
      messagePool[u.uid] = _.map([1,2,3], function(messageId) {
        return {
          content: '[message-with ' + u.name + ']: content' + messageId,
          sendAt: getNow(),
          sender: 'my-user-id',
          receiver: u.uid
        }
      });
    });

    function getNow () {
      return new Date().getTime();
    }

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
          messages = messagePool[uid];
        }
      },
      getCurrentUser: function() {
        return findUser(currentUserId);
      },

      sendChat: function(message) {
        if (!currentUserId) {
          return;
        }
        messages.push({
          content: message,
          sentAt: getNow(),
          sender: 'my-user-id',
          receiver: currentUserId
        });
      }
    };
    return toReturn;
  }
}());
