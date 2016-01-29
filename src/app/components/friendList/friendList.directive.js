(function() {
  'use strict';

  angular
    .module('angularTutorial')
    .directive('friendList', friendList);

  /** @ngInject */
  function friendList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/friendList/friendList.html',
      controller: FriendListController,
      controllerAs: 'friendListCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FriendListController(chatData) {
      this.friends = chatData.getFriends();
    }
  }

})();
