(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory () {
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

    return {
      getData: function() {
        return data;
      }
    };
  }
}());
