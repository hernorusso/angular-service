(function(angular) {
  'use strict';
  var myAppDev = angular.module('myAppE2E', ['myApp', 'ngMockE2E']);

  myAppDev.run(function($httpBackend) {
    //mocked back end servers
    var servers = [
      {
        "url": "http://boldtech-one.co",
        "priority": 1
      },
      {
        "url": "http://boldtech.co",
        "priority": 7
      }, {
        "url": "http://offline.boldtech.co",
        "priority": 2
      },
      {
        "url": "http://boldcommunity.com",
        "priority": 4
      }];

      // returns the current list of servers
      $httpBackend.whenGET('/servers').respond(servers);

      // servers mocked endpoints
      $httpBackend.whenGET('http://boldtech-one.co').respond(servers[0]);
      $httpBackend.whenGET('http://boldtech.co').respond(servers[1]);
      $httpBackend.whenGET('http://boldcommunity.com').respond(servers[3]);
      $httpBackend.whenGET('http://offline.boldtech.co').respond(servers[2]);

    });
  })(window.angular);
