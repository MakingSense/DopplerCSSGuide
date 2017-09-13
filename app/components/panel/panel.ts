(function () {
  'use strict';
  
  angular
    .module('dopplerCssGuideApp')
    .component('panel', {
      templateUrl: 'panel.html',
      controller: PanelController
    });

  function PanelController($scope: ng.IScope, componentService) {
    $scope.components = [];

    componentService.getComponents()
      .then(function(data) {
          $scope.components = data;
      });
  }

})();
