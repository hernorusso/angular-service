describe('Unit: MainController', function(){
var scope;  
  // var availableServerFactory = function($provide) {
  //   $provide.factory('availableServer', ['$q', function($q){
  //     var service = {
  //       findServer: findServer
  //     };
  //     
  //     return service;
  //     
  //     function findServer() {
  //       if (passPromise) {
  //         return $q.when('http://test-server.com');
  //       } else {
  //         return $q.reject('no available server');
  //       }
  //     }
  //   }]);
  // };
  
  beforeEach(module('myApp')); //function($provide) {
  //   $provide.factory('availableServer', ['$q', function($q){
  //     var findServer = jasmine.createSpy('findServer').and.CallFake(function () {
  //       if (passPromise) {
  //         return $q.when('http://test-server.com');
  //       } else {
  //         return $q.reject('no available server');
  //       }
  //     });
  //     return {
  //       findServer: findServer
  //     };
  //   }]);
  // }));
  beforeEach(inject( function($controller, $rootScope){
    scope = $rootScope.$new();
    $controller('MainController as vm', {$scope: scope});
  }));
  
  it('should have vm.findServer function defined', function () {
      // mainController.findServer();
      // expect(availableServer.findServer).toHaveBeenCalled();
      expect(scope.vm.findServer).toBeDefined();
      
      // expect(ctrl.server).toEqual('http://testServer.com');
  });
});
