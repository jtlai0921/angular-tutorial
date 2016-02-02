(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .controller('FriendListController', FriendListController);

  /** @ngInject */
  function FriendListController(chatData) {
    var vm = this;
    vm.users = chatData.getUsers();
    vm.getCurrentUser = function() {
      return chatData.getCurrentUser();
    }
  }
}());
