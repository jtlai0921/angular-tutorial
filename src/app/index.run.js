(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
