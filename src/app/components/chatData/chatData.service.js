(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_) {
    var users;
    var messagePool;

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

    var toReturn = {
      getUsers: function() {
        return users;
      },
      getMessages: function() {
        return messagePool[users[0].uid];
      }
    };
    return toReturn;
  }
}());
