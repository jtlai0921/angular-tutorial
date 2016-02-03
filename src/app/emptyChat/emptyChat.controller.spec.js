(function() {
  'use strict';

  describe('controllers EmptyChatController', function(){
    var $state, $controller, chatData;
    var usersLoadedDeffered;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_, _$state_, $q) {
      usersLoadedDeffered = $q.defer();
      chatData = _chatData_;
      $state = _$state_;
      $controller = _$controller_;
    }));

    it('goes to the first user state on user loaded if user is logged in',
       inject(function($rootScope, auth){

      var users = [ { uid: 'uid-1' }, { uid: 'uid2' } ];
      spyOn(auth, 'isLoggedIn').and.returnValue(true);
      spyOn($state, 'go');
      spyOn(chatData, 'onUserLoaded').and.returnValue(usersLoadedDeffered.promise);

      $controller('EmptyChatController');
      usersLoadedDeffered.resolve(users);

      $rootScope.$digest();

      expect($state.go).toHaveBeenCalledWith('home.chat', { uid: users[0].uid });
    }));

  });
})();
