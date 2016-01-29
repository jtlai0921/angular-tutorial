(function() {
  'use strict';
  angular
    .module('angularTutorial')
    .factory('chatData', chatDataFactory);

  /** @ngInject */
  function chatDataFactory () {
    var friends = [
      { name: 'Jack' },
      { name: 'Mary' }
    ];

    return {
      getFriends: function() {
        return friends;
      }
    };
  }
}());
