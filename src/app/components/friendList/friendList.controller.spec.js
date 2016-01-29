(function() {
  'use strict';

  describe('controllers', function(){
    var $controller, _;
    var chatData;
    var controller;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_, ___) {
      chatData = _chatData_;
      $controller = _$controller_;
      _ = ___;
    }));

    beforeEach(function(){
      var chats = [ { name: 'MockFriend' }, { name: 'MockFriend2' } ];
      spyOn(chatData, 'getData').and.returnValue(chats);
      controller = $controller('FriendListController');
    });

    describe('#chats', function(){
      it('returns the result of chatData#getData()', function(){
        expect(controller.chats).toEqual(chatData.getData());
      });
    });

    describe('#setCurrnet(chat)', function(){
      it('invokes `setCurrent` on chatData with given chat', function(){
        var chat = _.last(chatData.getData());
        spyOn(chatData, 'setCurrent');
        controller.setCurrent(chat);

        expect(chatData.setCurrent).toHaveBeenCalledWith(chat);
      });
    });

  });
})();
