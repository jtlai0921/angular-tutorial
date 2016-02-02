(function() {
  'use strict';

  describe('controllers ChatController', function(){
    var $stateParams, $controller, chatData;
    var usersLoadedDeffered;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_, $q, _$stateParams_) {
      $stateParams = _$stateParams_;
      usersLoadedDeffered = $q.defer();
      chatData = _chatData_;
      $controller = _$controller_;
    }));

    it('sets chatData current to stateParams uid on user loaded', inject(function($rootScope){
      var users = [ { uid: 'uid-1' }, { uid: 'uid2' } ];
      $stateParams.uid = 'the-uid';
      spyOn(chatData, 'setCurrent');
      spyOn(chatData, 'onUserLoaded').and.returnValue(usersLoadedDeffered.promise);

      $controller('ChatController');
      usersLoadedDeffered.resolve(users);

      $rootScope.$digest();

      expect(chatData.setCurrent).toHaveBeenCalledWith($stateParams.uid);
    }));

  });
})();
