var MainController = (function () {
    function MainController($scope) {
        this.$scope = $scope;
        this.$scope['mc'] = this;
    }
    MainController.prototype.start = function () {
        console.log("File1:", this.file1);
        console.log("File2:", this.file2);
        var fnca = new FileNameCompareAlgorithm(this.file1, this.file2);
        fnca.onProgress(function (message) {
            console.log("got progress", message);
        });
        fnca.onResults(function (r) {
            console.log(r);
        });
        fnca.start(function () {
            console.log("Done!");
        });
        fnca.emit("test", ["ha"]);
    };
    MainController.$inject = ['$scope'];
    return MainController;
})();
angular.module('assignment2').controller("MainController", MainController);
