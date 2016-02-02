(function() {
  angular.module('angularTutorial')
    .controller('ChatController', ChatController);

  /**@ngInject*/
  function ChatController (chatData, $state, $stateParams) {
    chatData.onUserLoaded().then(function() {
      chatData.setCurrent($stateParams.uid);
    });
  }
}());
