///<reference path="../../scripts/FileComparatorService"/>
var EndController = (function () {
    function EndController($scope, $state, $stateParams) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.resultsArray = new Array();
        this.$scope['ec'] = this;
        this.results = $stateParams.results;
        for (var name in this.results) {
            this.results[name]['name'] = name;
            this.resultsArray.push(this.results[name]);
        }
        console.log(this.resultsArray);
        if (!this.results) {
            this.$state.go("home");
            return;
        }
    }
    EndController.$inject = ['$scope', '$state', '$stateParams'];
    return EndController;
})();
angular.module('assignment2').controller("EndController", EndController);
