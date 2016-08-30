(function(angular) {
  'use strict';
  var myAppDev = angular.module('myAppE2E', ['myApp', 'ngMockE2E']);
  
  myAppDev.run(function($httpBackend) {
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
      
      
      // returns the current list of phones
      $httpBackend.whenGET('/servers').respond(servers);
      $httpBackend.whenGET('http://boldtech-one.co').respond(servers[0]);
      $httpBackend.whenGET('http://boldtech.co').respond(servers[1]);
      $httpBackend.whenGET('http://boldcommunity.com').respond(servers[3]);
      $httpBackend.whenGET('http://offline.boldtech.co').respond(404);
      
    });
  })(window.angular);
