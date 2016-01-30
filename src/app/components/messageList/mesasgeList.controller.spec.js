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

    describe('#getMessages', function(){
      it('returns chatData.getMessages()', function(){
        spyOn(chatData, 'getMessages').and.returnValue([{ content: 'message' }]);
        var controller = $controller('MessageListController');
        expect(controller.getMessages()).toEqual(chatData.getMessages());
      });
    });

  });
})();
