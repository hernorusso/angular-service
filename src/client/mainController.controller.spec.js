describe('Unit: MainController', function(){

  var vm, availableServerMock, passPromise, scope,
    successMsg = 'http://test-server.com',
    rejectMsg = 'No available server';

  // Mocking availableServer service
  beforeEach(function(){
    module(function($provide){
      $provide.factory('availableServerMock', function($q){
        var service = {
          findServer: findServer
        };
        return service;

        // mock pblic method
        function findServer () {
          if (passPromise) {
            return $q.when(successMsg);
          } else {
            return $q.reject(rejectMsg);
          }
        }
      });
    });
    module('myApp');
  });

  // instance MainController
  beforeEach( inject( function($rootScope, $controller, _availableServerMock_){
    scope = $rootScope.$new();
    availableServerMock = _availableServerMock_;

    // keep track of service activity
    spyOn(availableServerMock, 'findServer').and.callThrough();
    vm = $controller('MainController',{
      availableServer: availableServerMock,
      $scope: scope
    });
  }));

  //spec suite
  it('should have findServer function defined', function () {
    expect(vm.findServer).toBeDefined();
  });

  it('and should call findServer method on availableServer service when it\'s invoked ', function(){
    vm.findServer();
    expect(availableServerMock.findServer).toHaveBeenCalled();
  });

  it('and should get a server name as response', function(){
    passPromise = true;
    vm.findServer();
    scope.$digest();
    expect(vm.server).toEqual(successMsg);
  });

  it('or should get a rejection message', function(){
    passPromise = false;
    vm.findServer();
    scope.$digest();
    expect(vm.server).toEqual(rejectMsg);
  });
});
