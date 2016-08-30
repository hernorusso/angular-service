(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('myController', myController);

    myController.$inject = ['serverList'];

    /* @ngInject */
    function myController(serverList) {
        var vm = this;
        vm.serverList = serverList.findServer();
        
        activate();

        function activate() {

        }
    }
})();
