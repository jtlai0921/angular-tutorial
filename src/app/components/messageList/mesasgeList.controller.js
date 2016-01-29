(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('MessageListController', MessageListController);

  /*@ngInject*/
  function MessageListController (chatData, _) {
    var vm = this;
    vm.chat = chatData.getData()[0];
    vm.messages = _.reverse(vm.chat.messages);
  }
}());
