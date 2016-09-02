(function(angular) {
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
    /**
     * Find abailable server
     * @returns {Promise | String}  Promise is returned, then resolved with the name of selected server
     */
    function findServer() {
      var dfd = $q.defer();
      getAllServers().then(function(res){
        return $q.all(res.data.map(function(item){
          return $http.get(item.url, {
            timeout: 5000
          });
        })).then(function(results){
          var server = selectServer(results);
          if (server) {
            dfd.resolve(server.url);
          } else {
            dfd.reject(new Error('Not server avilable'));
          }
        });
      });
      return dfd.promise;
    }

    // private methods

    /**
     * Get a list of servers to check availability
     * @returns {Array}  Array containing servers, url
     */
    function getAllServers() {
      return $http.get('/servers');
    }

    /**
     * Select lowest priority server from available ones
     * @param {Array} servers - An array of available servers
     * @returns {Object} Object constaining selected server information
     */
    function selectServer(servers){
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
})(window.angular);
