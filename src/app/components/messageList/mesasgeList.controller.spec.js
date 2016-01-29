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

    describe('#getChat()', function(){
      it('returns the chat in chatData#getData() whose `current` is true', function(){
        var controller;
        var data = [
          { name: 'MockFriend', current: false },
          { name: 'MockFriend2', current: true }
        ];
        spyOn(chatData, 'getData').and.returnValue(data);
        controller = $controller('MessageListController');

        expect(controller.getChat()).toEqual(data[1]);
      });
    });

    describe('#getMessages', function(){
      it('returns chat messages', function(){
        var controller;
        var data = [
          {
            name: 'MockFriend',
            current: true,
            messages: [ { content: '1' }, { content: '2' } ]
          },
          {
            name: 'MockFriend2',
            current: false,
            messages: [ { content: '3' }, { content: '4' } ]
          }
        ];
        spyOn(chatData, 'getData').and.returnValue(data);
        controller = $controller('MessageListController');

        expect(controller.getMessages()).toEqual([ { content: '1' }, { content: '2' } ]);
      });
      it('returns [] if no current chat', function(){
        var controller;
        var data = [
          {
            name: 'MockFriend',
            current: false,
            messages: [ { content: '1' }, { content: '2' } ]
          },
          {
            name: 'MockFriend2',
            current: false,
            messages: [ { content: '3' }, { content: '4' } ]
          }
        ];
        spyOn(chatData, 'getData').and.returnValue(data);
        controller = $controller('MessageListController');

        expect(controller.getMessages()).toEqual([]);

      });
    });

  });
})();
