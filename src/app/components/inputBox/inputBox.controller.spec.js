(function() {
  'use strict';

  describe('controller InputBoxController', function(){
    var $controller, chatData;
    var controller;

    beforeEach(module('angularTutorial'));

    beforeEach(inject(function(_$controller_, _chatData_){
      $controller = _$controller_;
      chatData = _chatData_;
    }));

    beforeEach(function(){
      controller = $controller('InputBoxController');
    });
    describe('#submit(text)', function(){
      it('invokes chatData.sendChat with text', function(){
        var text = 'this is chat message';
        spyOn(chatData, 'sendChat');
        controller.submit(text);

        expect(chatData.sendChat).toHaveBeenCalledWith(text);
      });
    });
  });
}());
