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
    describe('#submit()', function(){
      var message
      beforeEach(function(){
        message = 'this is chat message';
        controller.message = message;
        spyOn(chatData, 'sendChat');
      });
      it('invokes chatData.sendChat with controller message', function(){
        controller.submit();

        expect(chatData.sendChat).toHaveBeenCalledWith(message);
      });

      it('clear controller message after sending', function(){
        controller.submit();

        expect(controller.message).toEqual('');
      });
      it('does nothing if no message', function(){
        controller.message = '';
        controller.submit();

        expect(chatData.sendChat).not.toHaveBeenCalled();
      });
    });
  });
}());
