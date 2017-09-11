(function () {
  'use strict';

  angular
    .module('dopplerCssGuideApp')
    .controller('PanelCtrl', PanelCtrl);

  PanelCtrl.$inject = [
    '$scope',
    'componentService'
  ];

  function PanelCtrl($scope: ng.IScope, componentService) {
    $scope.components = [];

    componentService.getComponents()
      .then(function(data) {
          $scope.components = data;
      });
  }

})();
