(function(angular) {
  'use strict';

  angular
    .module('myApp')
    .controller('MainController', MainController);

  MainController.$inject = ['availableServer'];

  /* @ngInject */
  function MainController(availableServer) {
    var vm = this;

    /**
     * Get Available server, with lowest priority
     * @returns {String} The server url.
     */
    vm.findServer = function() {
      availableServer.findServer().then(function(server){
        vm.server = server;
      });
    };
  }
})(window.angular);
