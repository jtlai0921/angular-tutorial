(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('MessageListController', MessageListController);

  /*@ngInject*/
  function MessageListController (chatData) {
    var vm = this;
    vm.getChat = function() {
    }

    vm.getMessages = function() {
      return chatData.getMessages();
    }
  }
}());
