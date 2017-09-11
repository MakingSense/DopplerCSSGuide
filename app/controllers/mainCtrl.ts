(function () {
  'use strict';

  angular
    .module('dopplerCssGuideApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [
    '$scope',
    'componentService'
  ];

  function MainCtrl($scope: ng.IScope, componentService) {
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
