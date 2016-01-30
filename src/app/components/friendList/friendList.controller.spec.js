(function() {
  'use strict';

  describe('controllers FriendListController', function(){
    var $controller;
    var chatData;
    var controller;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_) {
      chatData = _chatData_;
      $controller = _$controller_;
    }));

    beforeEach(function(){
      var users = [ { name: 'MockFriend' }, { name: 'MockFriend2' } ];
      spyOn(chatData, 'getUsers').and.returnValue(users);
      controller = $controller('FriendListController');
    });

    describe('#users', function(){
      it('returns the result of chatData#getData()', function(){
        expect(controller.users).toEqual(chatData.getUsers());
      });
    });

    describe('#setCurrnet(uid)', function(){
      it('invokes `setCurrent` on chatData with given user', function(){
        var user = { uid: 'the-uid' };
        spyOn(chatData, 'setCurrent');
        controller.setCurrent(user);

        expect(chatData.setCurrent).toHaveBeenCalledWith(user.uid);
      });
    });

  });
})();
