(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('MessageListController', MessageListController);

  /*@ngInject*/
  function MessageListController (chatData, _) {
    var vm = this;
    vm.getChat = function() {
      return _.find(chatData.getData(), function(c) { return c.current === true; });
    }

    vm.getMessages = function() {
      return chatData.getMessages();
      // var chat = vm.getChat();
      // return chat ? chat.messages : [];
    }
  }
}());
