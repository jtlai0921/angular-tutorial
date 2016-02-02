(function() {
  'use strict';

  describe('service chatData', function() {
    beforeEach(module('angularTutorial'));

    describe('#getUsers()', function(){
      it('returns an array containing users with `uid`, `name` keys', function(){
        inject(function(chatData) {
          var users = chatData.getUsers();

          expect(users instanceof Array).toEqual(true);
          users.forEach(function(u) {
            expect(u.uid).not.toBeUndefined();
            expect(u.name).not.toBeUndefined();
          })
        })
      });
    });

    describe('#getMessages()', function(){
      it('returns an array of messages with key `content`', function(){
        inject(function(chatData) {
          var messages = chatData.getMessages();
          expect(messages instanceof Array).toEqual(true);
          messages.forEach(function(m) {
            expect(m.content).not.toBeUndefined();
          });
        });
      });
    });

  });
})();
