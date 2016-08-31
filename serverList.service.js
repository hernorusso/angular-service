(function() {
  'use strict';

  angular
  .module('myApp')
  .factory('availableServer', availableServer);

  availableServer.$inject = ['$http', '$q'];

  /* @ngInject */
  function availableServer($http, $q) {
    var service = {
      findServer: findServer
    };

    return service;

    // public methods
    function findServer() {
      var dfd = $q.defer();
      getAllServers().then(function(res){
        return $q.all(res.data.map(function(item){
          return $http.get(item.url);
        })).then(function(results){
          console.log('results', results);
          var server = selectServer(results);
          if (server) {
            dfd.resolve(server);
          } else {
            dfd.reject(new Error('Not server avilable'));
          }
        })
      });
      return dfd.promise;
    }

    // private methods
    function getAllServers() {
      return $http.get('/servers');
    }

    function selectServer(servers){
      //iterate, check promise, select priority
      var selectedServer = false,
        availableServers = [];

      servers.forEach(function(server){
        if (server.status >= 200 && server.status < 300) {
          availableServers.push(server.data);
        }
      });
      if (availableServers.length > 0) {
        selectedServer = availableServers.reduce(function(pre, cur){
          return (pre.priority < cur.priority) ? pre : cur;
        });
      }
      return selectedServer;
    }
  }
})();
