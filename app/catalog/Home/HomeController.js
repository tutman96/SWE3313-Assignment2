///<reference path="../../scripts/FileComparatorService"/>
var HomeController = (function () {
    function HomeController($scope, $state) {
        this.$scope = $scope;
        this.$state = $state;
        this.$scope['hc'] = this;
    }
    HomeController.prototype.start = function () {
        this.$state.go("results", {
            file1: this.file1,
            file2: this.file2
        });
    };
    HomeController.$inject = ['$scope', '$state'];
    return HomeController;
})();
angular.module('assignment2').controller("HomeController", HomeController);
