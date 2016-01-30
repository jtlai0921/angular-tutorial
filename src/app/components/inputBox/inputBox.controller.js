(function() {
  'use strict';

  angular.module('angularTutorial')
    .controller('InputBoxController', InputBoxController);

  function InputBoxController (chatData) {
    var vm = this;
    vm.submit = function(text) {
      chatData.sendChat(text);
    }
  }
}());
