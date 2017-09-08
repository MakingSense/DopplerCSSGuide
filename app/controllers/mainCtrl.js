(function () {
  'use strict';

  angular
    .module('dopplerCssGuideApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [
    '$scope'
  ];

  function MainCtrl($scope) {
    $scope.foo = "Hola Mundo";
  }

})();
