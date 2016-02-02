(function() {
  'use strict';

  describe('controllers', function(){
    var $controller;

    beforeEach(module('angularTutorial'));
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    it('is defined', function(){
      var controller = $controller('MainController');
      expect(controller).not.toBeUndefined();
    });
  });
})();
