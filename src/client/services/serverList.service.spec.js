'use strict';
describe('Unit: serverList service', function(){
  // scope variables:
  var $httpBackend, availableServer, serversEndPoint;

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

    // define back end responses
    serversEndPoint = $httpBackend.when('GET', 'http://boldtech-one.co').respond(servers);

    // inject service to test
    availableServer = $injector.get('availableServer');

    // invoke service
    availableServer.findServer();
  }));

  // check that there is no pending resquest / expectations
  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  // Specs suite
  it('should get a server list from back end', function(){
    $httpBackend.expect('GET', '/servers').respond(servers);
    $httpBackend.flush();
  });

  // End suite
});
