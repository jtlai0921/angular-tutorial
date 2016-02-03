(function() {
  angular.module('angularTutorial')
    .controller('EmptyChatController', EmptyChatController);

  /**@ngInject*/
  function EmptyChatController (chatData, $state, auth) {
    chatData.onUserLoaded().then(function(users) {
      if (auth.isLoggedIn()) {
        if (users.length) {
          $state.go('home.chat', { uid: users[0].uid });
        }
      }
    })
  }
}());
