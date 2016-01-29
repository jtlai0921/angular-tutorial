(function() {
  'use strict';

  describe('controllers', function(){
    var $controller;
    var chatData;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_) {
      chatData = _chatData_;
      $controller = _$controller_;
    }));

    describe('#friends', function(){
      it('returns the result of chatData#getData()', function(){
        var controller;
        var friends = [ { name: 'MockFriend' }, { name: 'MockFriend2' } ];
        spyOn(chatData, 'getData').and.returnValue(friends);
        controller = $controller('FriendListController');

        expect(controller.friends).toEqual(friends);
      });
    });

  });
})();
