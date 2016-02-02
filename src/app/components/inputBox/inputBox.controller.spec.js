(function() {
  'use strict';

  describe('controller InputBoxController', function(){
    var $controller;
    var controller;

    beforeEach(module('angularTutorial'));

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    beforeEach(function(){
      controller = $controller('InputBoxController');
    });
    it('is defined', function(){
      expect(controller).not.toBeUndefined();
    });
  });
}());
