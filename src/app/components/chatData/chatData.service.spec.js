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

    describe('#getFriends()', function(){
      it('returns an array of mock data', function(){
        expect(chatData.getFriends()).toEqual([
          { name: 'Jack' },
          { name: 'Mary' }
        ]);
      });
    });
  });
})();
