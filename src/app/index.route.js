(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'authController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('home.chat', {
        url: ':uid',
        templateUrl: 'app/chat/chat.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
