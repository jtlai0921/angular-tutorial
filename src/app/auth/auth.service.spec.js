(function() {
  'use strict';

  fdescribe('Service AuthService', function(){
    var firebaseRef, auth;
    var $firebaseAuth;
    var firebaseAuthObject;
    var refChild;

    beforeEach(module('angularTutorial'));
    beforeEach(module(function($provide) {
      firebaseAuthObject = {};
      $firebaseAuth = function() {
        return firebaseAuthObject;
      }

      $provide.value('$firebaseAuth', $firebaseAuth);
    }))

    beforeEach(inject(function(_auth_, _firebaseRef_){
      refChild = {
        set: jasmine.createSpy(),
        child: function() { return refChild; }
      };
      firebaseRef = _firebaseRef_;
      spyOn(firebaseRef, 'child').and.returnValue(refChild);
      auth = _auth_;
    }));

    describe('#isLoggedIn()', function(){
      it('returns false if ref.getAuth returns null', function(){
        spyOn(firebaseRef, 'getAuth').and.returnValue(null);
        expect(auth.isLoggedIn()).toEqual(false);
      });
      it('returns true if ref.getAuth returns an object', function(){
        spyOn(firebaseRef, 'getAuth').and.returnValue({});
        expect(auth.isLoggedIn()).toEqual(true);
      });
    });

    describe('registerAndLogin(email, password, name)', function(){
      var email = 'test@test.com',
          password = 'the-secret',
          name = 'user name';
      var createUserDeferred, authWithPasswordDeferred;
      var $rootScope;

      beforeEach(inject(function(_$q_, _$rootScope_){
        $rootScope = _$rootScope_;
        createUserDeferred = _$q_.defer();
        authWithPasswordDeferred = _$q_.defer();

        firebaseAuthObject.$createUser = function() { return createUserDeferred.promise; }
        firebaseAuthObject.$authWithPassword = function() { return authWithPasswordDeferred.promise; }
      }));

      it('invokes $createUser with email and password', function(){
        spyOn(firebaseAuthObject, '$createUser').and.callThrough();
        auth.registerAndLogin(email, password, name);
        expect(firebaseAuthObject.$createUser)
          .toHaveBeenCalledWith({email: email, password: password})
      });

      it('invokes $authWithPassword after creating user success', function(){
        spyOn(firebaseAuthObject, '$authWithPassword').and.callThrough();
        auth.registerAndLogin(email, password, name);
        createUserDeferred.resolve({});
        $rootScope.$apply();

        expect(firebaseAuthObject.$authWithPassword)
          .toHaveBeenCalledWith({email: email, password: password})
      });

      it('resolve returned promise after auth success', function(){
        var onSuccess = jasmine.createSpy();
        var promise = auth.registerAndLogin(email, password, name);

        promise.then(onSuccess);
        createUserDeferred.resolve({});
        authWithPasswordDeferred.resolve({});
        $rootScope.$apply();

        expect(onSuccess).toHaveBeenCalled();
      });

    });
  });
}());
