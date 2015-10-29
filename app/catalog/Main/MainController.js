var MainController = (function () {
    function MainController($scope) {
        this.$scope = $scope;
        this.$scope['mc'] = this;
    }
    MainController.$inject = ['$scope'];
    return MainController;
})();
angular.module('assignment2').controller("MainController", MainController);
