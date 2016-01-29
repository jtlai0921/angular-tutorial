(function() {
  'use strict';

  describe('controllers MessageList', function(){
    var $controller;
    var chatData;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_, _chatData_) {
      chatData = _chatData_;
      $controller = _$controller_;
    }));

    describe('#chat', function(){
      it('returns the first element of chatData#getData()', function(){
        var controller;
        var data = [ { name: 'MockFriend' }, { name: 'MockFriend2' } ];
        spyOn(chatData, 'getData').and.returnValue(data);
        controller = $controller('MessageListController');

        expect(controller.chat).toEqual({ name: 'MockFriend' });
      });
    });

    describe('#messages', function(){
      it('returns reverse of chat messages', function(){
        var controller;
        var data = [
          { name: 'MockFriend', messages: [ { content: '1' }, { content: '2' } ] },
          { name: 'MockFriend2' }
        ];
        spyOn(chatData, 'getData').and.returnValue(data);
        controller = $controller('MessageListController');

        expect(controller.messages).toEqual([ { content: '2' }, { content: '1' } ]);
      });
    });

  });
})();
