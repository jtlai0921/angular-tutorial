(function() {
  'use strict';

  angular.module('angularTutorial')
    .directive('messageList', messageList);

  function messageList () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/messageList/messageList.html',
      controller: 'MessageListController',
      controllerAs: 'messageListCtrl',
      bindToController: true
    };
  }
}());
