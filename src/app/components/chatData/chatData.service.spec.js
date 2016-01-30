(function() {
  'use strict';

  describe('service chatData', function() {
    var chatData, _;

    beforeEach(module('angularTutorial'));

    beforeEach(inject(function(_chatData_, ___) {
      chatData = _chatData_;
      _ = ___;
    }));

    it('should be registered', function(){
      expect(chatData).not.toEqual(null);
    });

    describe('#getData()', function(){
      it('returns an array of mock data', function(){
        var now = 1454058347566;
        expect(chatData.getData()).toEqual([
          {
            name: 'Jack',
            messages: [
              {
                content: "Hi there, how's it going?",
                fromMe: true,
                sentAt: now - 60*1000
              },
              {
                content: 'Hello Im Jack',
                fromMe: false,
                sentAt: now - 60*2000
              }
            ]
          },
          {
            name: 'Mary',
            messages: [
              {
                content: 'Hello Im Mary',
                fromMe: false,
                sentAt: now - 60*3000
              },
              {
                content: "Hi, who are you",
                fromMe: true,
                sentAt: now - 60*4000
              }
            ]
          }
        ])
      });
    });

    describe('#setCurrent(chat)', function(){
      it('sets the given chat as `current`', function(){
        var chat = chatData.getData()[0];
        chatData.setCurrent(chat);

        expect(chatData.getData()[0].current).toEqual(true);
      });
      it('unsets other chat.current to false', function(){
        var chat;
        chat = chatData.getData()[0];
        chatData.setCurrent(chat);

        chat = chatData.getData()[1];
        chatData.setCurrent(chat);

        expect(chatData.getData()[0].current).toEqual(false);
        expect(chatData.getData()[1].current).toEqual(true);
      });
      it('does nothing if given chat is not in chat pool', function(){
        var misgivenChat = { key: 'val' };
        chatData.setCurrent(misgivenChat);

        expect(misgivenChat.current).toEqual(undefined);
      });
    });

    describe('#sendChat(message)', function(){
      var chat;
      beforeEach(function(){
        chat = chatData.getData()[0];
        chatData.setCurrent(chat);
      });
      it('push chat message into current user', function(){
        chatData.sendChat('hello');

        expect(_.last(chat.messages).content).toEqual('hello');
      });
    });

  });
})();
