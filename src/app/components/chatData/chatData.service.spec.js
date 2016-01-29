(function() {
  'use strict';

  describe('service chatData', function() {
    var chatData;

    beforeEach(module('angularTutorial'));

    beforeEach(inject(function(_chatData_) {
      chatData = _chatData_;
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

  });
})();
