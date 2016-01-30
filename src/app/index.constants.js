/* global malarkey:false, moment:false, _: false */
(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .constant('malarkey', malarkey)
    .constant('_', _)
    .constant('firebaseEndpoint', 'https://cm-angular-chat.firebaseio.com')
    .constant('moment', moment);

})();
