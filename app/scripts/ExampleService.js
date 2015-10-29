///<reference path="../../typings/tsd.d.ts"/>
var ExampleService = (function () {
    function ExampleService($state) {
        this.$state = $state;
    }
    ExampleService.$inject = ['$state']; //this will be any angular dependencies you need ($state, etc.)
    return ExampleService;
})();
angular.module('assignment2').service("ExampleService", ExampleService);
