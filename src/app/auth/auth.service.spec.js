(function() {
  'use strict';

  describe('Service AuthService', function(){
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

    describe('Login Behaviors', function(){
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

      describe('#registerAndLogin(email, password, name)', function(){
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

        it('sets name on child node it is given', function(){
          auth.registerAndLogin(email, password, name);

          createUserDeferred.resolve({});
          authWithPasswordDeferred.resolve({ uid: 'the-uid' });
          $rootScope.$apply();
          expect(refChild.set).toHaveBeenCalledWith({ name: name });
        });
      });

      describe('#login(email, password, name)', function(){
        it('invokes $authWithPassword after creating user success', function(){
          spyOn(firebaseAuthObject, '$authWithPassword').and.callThrough();
          auth.login(email, password, name);

          expect(firebaseAuthObject.$authWithPassword)
            .toHaveBeenCalledWith({email: email, password: password})
        });
        it('resolves returned promise after login success', function(){
          var onSuccess = jasmine.createSpy();
          var promise = auth.login(email, password, name);
          promise.then(onSuccess);

          authWithPasswordDeferred.resolve({ uid: 'the-uid' });
          $rootScope.$apply();
          expect(onSuccess).toHaveBeenCalled();
        });
        it('sets name on child node if it is given', function(){
          auth.login(email, password, name);

          authWithPasswordDeferred.resolve({ uid: 'the-uid' });
          $rootScope.$apply();
          expect(refChild.set).toHaveBeenCalledWith({ name: name });
        });
      });

      describe('#getUid()', function(){
        it('returns getAuth().uid if logged in already', function(){
          spyOn(firebaseRef, 'getAuth').and.returnValue({ uid: 'the-uid' });
          expect(auth.getUid()).toEqual('the-uid');
        });
        it('returns null if user is not logged in yet', function(){
          spyOn(firebaseRef, 'getAuth').and.returnValue(null);
          expect(auth.getUid()).toEqual(null);
        });
      });


    });
  });
}());
