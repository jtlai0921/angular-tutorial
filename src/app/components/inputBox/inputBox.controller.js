(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('InputBoxController', InputBoxController);

  function InputBoxController (chatData) {
    var vm = this;

    vm.message = '';
    vm.submit = function() {
      var message = vm.message;

      if (message) {
        chatData.sendChat(message);
        vm.message = '';
      } else {
        return;
      }
    }
  }
}());
