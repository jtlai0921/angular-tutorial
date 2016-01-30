(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('MessageListController', MessageListController);

  /*@ngInject*/
  function MessageListController (chatData) {
    var vm = this;
    vm.getCurrentUser = function() {
      return chatData.getCurrentUser();
    }

    vm.getMessages = function() {
      return chatData.getMessages();
    }
  }
}());
