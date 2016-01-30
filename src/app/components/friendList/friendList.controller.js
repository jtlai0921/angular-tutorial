(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .controller('FriendListController', FriendListController);

  /** @ngInject */
  function FriendListController(chatData) {
    var vm = this;
    vm.users = chatData.getUsers();
    vm.setCurrent = function(user) {
      chatData.setCurrent(user.uid);
    };
    vm.getCurrent = function() {
      return chatData.getCurrent();
    }
  }
}());
