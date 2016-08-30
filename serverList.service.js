(function() {
  'use strict';
  
  angular
  .module('myApp')
  .factory('serverList', serverList);
  
  serverList.$inject = ['$http', '$q'];
  
  /* @ngInject */
  function serverList($http, $q) {
    function getAllServers() {
      return $http.get('/servers');
    }
    
    function checkAllServers(res) {
      var servers = res.data;
      var promises = [];
      var promise;
      servers.forEach(function(server) {
        promise = $http({
          url: server.url,
          method: 'GET',
          config: {
            timeout: 5000
          }
        });
        promises.push(promise);
      });
      return promises;
    }
    
    function selectServer(promises){
      //iterate, check promise, select priority
      if (server.length > 0) {
        retu
      }
    }
    
    function findServer() {
      var dfd = $q.defer();
      getAllServers().then(function(res){
        var promises = checkAllServers(res);
        return $q.all(promises).then(function(results){
          var server = selectServer(results);
          if (server) {
            dfd.resolve(server);
          }
          dfd.reject(new Error('Not server avilable'));
        })
      });
      return dfd.promise;
    }
    
    return {
      findServer: findServer
    };
  }
})();
