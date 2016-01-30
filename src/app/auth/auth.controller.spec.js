(function() {
  'use strict';

  describe('controller AuthController', function(){
    var $controller, $state;
    var auth;
    beforeEach(module('angularTutorial'));

    beforeEach(inject(function(_$controller_, _auth_, _$state_){
      $state = _$state_;
      $controller = _$controller_;
      auth = _auth_;
    }));

    it('goes to home state if user is logged', function(){
      spyOn($state, 'go');
      spyOn(auth, 'isLoggedIn').and.returnValue(true);
      $controller('AuthController');
      expect($state.go).toHaveBeenCalledWith('home');
    });

    describe('#submit()', function(){
      var controller
      var email = 'the-email@test.com',
          password = 'the-secret',
          name = 'name of user';
      var deferred;

      beforeEach(inject(function(_$q_){
        deferred = _$q_.defer();
      }));

      beforeEach(function(){
        spyOn($state, 'go');
        spyOn(auth, 'isLoggedIn').and.returnValue(false);
        spyOn(auth, 'registerAndLogin').and.returnValue(deferred.promise);
        controller = $controller('AuthController');

        controller.email = email;
        controller.password = password;
        controller.name = name;
      });

      it('invokes auth.registerAndLogin with email, password, name', function(){
        controller.submit();

        expect(auth.registerAndLogin).toHaveBeenCalledWith(email, password, name);
      });
      it('goes to home state after success', inject(function($rootScope){
        controller.submit();
        deferred.resolve();
        $rootScope.$apply();

        expect($state.go).toHaveBeenCalledWith('home');
      }));
      it('sets error message if error', inject(function($rootScope){
        var errorMessage = 'the-error';
        controller.submit();
        deferred.reject(errorMessage);
        $rootScope.$apply();

        expect(controller.errorMessage).toEqual(errorMessage);
      }));

    });

  });
}());
