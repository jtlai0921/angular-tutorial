(function() {
  'use strict';

  describe('service chatData', function() {
    var firebaseRef, auth, userLoadedDeferred;
    var usersFbArray, usersRef, messagesFbArray, messagesRef;

    var user1 = { uid: 'uid-1' },
      user2 = { uid: 'uid-2' };
    var message1 = { content: 1 },
      message2 = { content: 2 };

    beforeEach(module('angularTutorial'));
    beforeEach(module(function($provide) {
      usersRef = {};
      usersFbArray = [user1, user2];
      messagesRef = { child: function() { return messagesRef; } };
      messagesFbArray = [message1, message2];

      var $firebaseArray = function(ref) {
        return ref === messagesRef ? messagesFbArray : usersFbArray;
      }
      $provide.value('$firebaseArray', $firebaseArray);
      return;
    }));

    beforeEach(inject(function(_firebaseRef_, _auth_, $q) {
      firebaseRef = _firebaseRef_;
      auth = _auth_;
      userLoadedDeferred = $q.defer();
      usersFbArray.$loaded = function() { return userLoadedDeferred.promise; }
    }));

    beforeEach(function(){
      spyOn(firebaseRef, 'child').and.callFake(function(path) {
        return path === 'users' ? usersRef : messagesRef;
      });
      spyOn(auth, 'getUid').and.returnValue('my-uid');
    });

    describe('#getUsers()', function(){
      it('returns a firebase array of `users` path', function(){
        inject(function(chatData) {
          var users = chatData.getUsers();

          expect(firebaseRef.child).toHaveBeenCalledWith('users');
          expect(users[0]).toEqual(user1);
          expect(users[1]).toEqual(user2);
        })
      });
    });


    describe('Current chat behaviors', function(){
      describe('#setCurrent(uid)', function(){
        it('sets current user with uid', function(){
          inject(function(chatData) {
            chatData.setCurrent('uid-1');

            expect(chatData.getCurrentUser()).toEqual({ uid: 'uid-1' });
          });
        });
        it('fetches messages of composit uid', function(){
          spyOn(messagesRef, 'child').and.callThrough();
          inject(function(chatData) {
            chatData.setCurrent('uid-1');
            expect(messagesRef.child).toHaveBeenCalledWith('uid-1---my-uid');
            expect(chatData.getMessages()).toEqual([message1, message2]);
          });
        });
        it('not fetches messages if uid not in users list', function(){
          spyOn(messagesRef, 'child').and.callThrough();
          inject(function(chatData) {
            chatData.setCurrent('uid-unexist');
            expect(messagesRef.child).not.toHaveBeenCalled();
            expect(chatData.getMessages()).toEqual([]);
          });
        });
      });
    });


    describe('#sendChat(message)', function(){
      it('adds chat to messages firebase array', function(){
        var chat;
        messagesFbArray.$add = function(c) {
          chat = c
        };
        inject(function(chatData) {
          chatData.setCurrent('uid-1');
          chatData.sendChat('the-message');
          expect(chat.content).toEqual('the-message');
          expect(chat.sender).toEqual('my-uid');
          expect(chat.receiver).toEqual('uid-1');
        })
      });
    });


  });
})();
