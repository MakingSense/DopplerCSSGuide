(function () {
  'use strict';
  
  angular
    .module('dopplerCssGuideApp')
    .component('main', {
      templateUrl: 'main.html',
      controller: MainController
    });

  function MainController($scope: ng.IScope, componentService) {
    $scope.componentName = ''; 
    $scope.component = {};
    $scope.showNewComponent = false;
    $scope.save = function () {
       $scope.component = componentService.create($scope.componentName);
    };

    $scope.getComponent = function (id) {
      $scope.component = componentService.getComponent(id);
      $scope.showNewComponent = true;
    }
  }

})();
