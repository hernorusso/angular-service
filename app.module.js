(function(angular) {
  'use strict';
  var myApp = angular.module('myApp', []);

  myApp.controller('MainCtrl', function MainCtrl(availableServer, $scope) {
    var vm = this;
    vm.findserver = function() {
      availableServer.findServer().then(function(server){
        $scope.server = server;
      });
    };
  });
})(window.angular);
