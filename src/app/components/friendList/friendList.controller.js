(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .controller('FriendListController', FriendListController);

  /** @ngInject */
  function FriendListController(chatData) {
    var vm = this;
    vm.chats = chatData.getData();
    vm.setCurrent = function(chat) {
      chatData.setCurrent(chat);
    }
  }
}());
