'use strict';
describe('Unit: serverList service', function(){
  // scope variables:
  var $httpBackend, scope, $rootScope, availableServer, serversEndPoint, promise;

  // mocked server list
  var servers = [
    {
      "url": "http://boldtech-one.co",
      "priority": 1
    }];
    // {
    //   "url": "http://boldtech.co",
    //   "priority": 7
    // }, {
    //   "url": "http://offline.boldtech.co",
    //   "priority": 2
    // },
    // {
    //   "url": "http://boldcommunity.com",
    //   "priority": 4
    // }];

  // load app
  beforeEach( function(){
    module('myApp');
  });

  // load services; define mock endpoints
  beforeEach( inject(function($injector){
    // set httpBackend mock
    $httpBackend = $injector.get('$httpBackend');

    // inject rootscope for triggering digest() cicle
    $rootScope = $injector.get('$rootScope');

    // define back end responses
    serversEndPoint = $httpBackend.when('GET', 'http://boldtech-one.co').respond(servers);

    // inject service to test
    availableServer = $injector.get('availableServer');

    // invoke service
    promise = availableServer.findServer();
  }));

  // check that there is no pending resquest / expectations
  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation(false);
     $httpBackend.verifyNoOutstandingRequest();
   });

  // Specs suite
  it('should get a server list from back end', function(){
    $httpBackend.expect('GET', '/servers').respond(servers);
    $httpBackend.flush();
  });

  it('should hit each endpoint after get servers', function(){
    $httpBackend.expect('GET', '/servers').respond(servers);
    $httpBackend.expect('GET', 'http://boldtech-one.co').respond(servers);
    $httpBackend.flush();
  });

  it('should return the lowest priority server', function(done){
    scope = $rootScope.$new();
    $httpBackend.when('GET', '/servers').respond(servers);
    $httpBackend.expect('GET', 'http://boldtech-one.co').respond(servers[0]);
    $httpBackend.flush();
    promise.
      then(function(server){
        expect(server).toBe('http://boldtech-one.co');
        done();
        console.log(server, 'test');
      });
    scope.$apply();
  });

  it('should process rejects', function(){
    $httpBackend.expect('GET', '/servers').respond(servers);
    $httpBackend.expect('GET', 'http://boldtech-one.co').respond(404);
    $httpBackend.flush();
  });


  // End suite
});
