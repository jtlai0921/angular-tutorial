(function() {
  'use strict';

  describe('controllers', function(){
    var auth, $state, $controller;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _auth_, _$state_) {
      $state = _$state_;
      auth = _auth_
      $controller = _$controller_;
    }));

    it('goes to `auth` state if not logged in', function(){
      spyOn($state, 'go');
      spyOn(auth, 'isLoggedIn').and.returnValue(false);

      $controller('MainController');

      expect($state.go).toHaveBeenCalledWith('auth');
    });

  });
})();
