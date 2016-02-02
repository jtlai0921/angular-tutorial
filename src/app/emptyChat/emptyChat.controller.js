(function() {
  angular.module('angularTutorial')
    .controller('EmptyChatController', EmptyChatController);

  /**@ngInject*/
  function EmptyChatController (chatData, $state) {
    chatData.onUserLoaded().then(function(users) {
      if (users.length) {
        $state.go('home.chat', { uid: users[0].uid });
      }
    })
  }
}());
