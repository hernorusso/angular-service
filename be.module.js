(function(angular) {
  'use strict';
  var myAppDev = angular.module('myAppE2E', ['myApp', 'ngMockE2E']);

  myAppDev.run(function($httpBackend) {
    //mocked back end servers
    var servers = [
      {
        "url": "/boldtech-one.co",
        "priority": 1
      },
      {
        "url": "/boldtech.co",
        "priority": 7
      }, {
        "url": "/offline.boldtech.co",
        "priority": 2
      },
      {
        "url": "/boldcommunity.com",
        "priority": 4
      }];

      // returns the current list of servers
      $httpBackend.whenGET('/servers').respond(servers);

      // servers mocked endpoints
      $httpBackend.whenGET('/boldtech-one.co').respond(servers[0]);
      $httpBackend.whenGET('/boldtech.co').respond(servers[1]);
      $httpBackend.whenGET('/boldcommunity.com').respond(servers[3]);
      $httpBackend.whenGET('/offline.boldtech.co').respond(servers[2]);

    });
  })(window.angular);
