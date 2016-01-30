(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory (_) {
    var now = 1454058347566;
    var data = [
      {
        name: 'Jack',
        messages: [
          {
            content: "Hi there, how's it going?",
            fromMe: true,
            sentAt: now - 60*1000
          },
          {
            content: 'Hello Im Jack',
            fromMe: false,
            sentAt: now - 60*2000
          }
        ]
      },
      {
        name: 'Mary',
        messages: [
          {
            content: 'Hello Im Mary',
            fromMe: false,
            sentAt: now - 60*3000
          },
          {
            content: "Hi, who are you",
            fromMe: true,
            sentAt: now - 60*4000
          }
        ]
      }
    ];

    function currentChat () {
      return _.find(data, function(d) {
        return d.current === true;
      });
    }
    function getNow () {
      return new Date().getTime();
    }

    return {
      getData: function() {
        return data;
      },
      setCurrent: function(chat) {
        var matchedChat = _.find(data, function(d) {
          return chat === d;
        });
        if (matchedChat) {
          _.each(data, function(d) { d.current = false; })
          matchedChat.current = true;
        }

      },
      sendChat: function(message) {
        var chat = currentChat();
        chat.messages.push({ content: message, sentAt: getNow(), fromMe: true });
      }
    };
  }
}());
