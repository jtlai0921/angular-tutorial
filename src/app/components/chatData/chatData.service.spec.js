(function() {
  'use strict';

  describe('service chatData', function() {
    beforeEach(module('angularTutorial'));

    describe('#getUsers()', function(){
      it('returns an array containing users with `uid`, `name` keys', function(){
        inject(function(chatData) {
          var users = chatData.getUsers();

          expect(users instanceof Array).toEqual(true);
        })
      });
    });


    describe('Current chat behaviors', function(){
      describe('#setCurrent(uid)', function(){
        it('sets current user with uid', function(){
          inject(function(chatData) {
            var uid = chatData.getUsers()[0].uid;
            chatData.setCurrent(uid);

            expect(chatData.getCurrentUser().uid).toEqual(uid);
          });
        });
        it('makes `getMessages()` return messages of the user', function(){
          inject(function(chatData) {
            var messages;
            var user = chatData.getUsers()[0];
            chatData.setCurrent(user.uid);

            messages = chatData.getMessages();

            messages.forEach(function(msg) {
              expect(msg.content.indexOf('[message-with ' + user.name + ']')).not.toEqual('-1');
            })
          });
        });
      });
    });

    describe('#sendChat(message)', function(){
      it('pushes a message into current message array', function(){
        inject(function(chatData) {
          var messages;
          var user = chatData.getUsers()[0];
          chatData.setCurrent(user.uid);
          chatData.sendChat('the-message');

          messages = chatData.getMessages();

          expect(messages[messages.length - 1].content).toEqual('the-message');
        })
      });
    });

  });
})();
