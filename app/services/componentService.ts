(function() {
  'use strict';

  angular
    .module('dopplerCssGuideApp')
    .service('componentService', componentService);

  componentService.$inject = [
    '$http'
  ];

  function componentService($http) {
    
    var service = {
      create: create,
      getComponents: getComponents,
      getComponent: getComponent
    };

    var component = {};

    return service;

    // get all components
    function getComponents() {
      return $http.get("./components.json").then(function(response){
        return response.data.components;
      });
    };    

    function create(componentName: string) {
      component = { name:componentName, id:10 };
      return component;
    };

    function getComponent(componentId: number) {
      return component;
    };

  }

})();