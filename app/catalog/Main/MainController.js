///<reference path="../../scripts/FileComparatorService"/>
var MainController = (function () {
    function MainController($scope, FileComparatorService) {
        this.$scope = $scope;
        this.FileComparatorService = FileComparatorService;
        this.$scope['mc'] = this;
    }
    MainController.prototype.start = function () {
        console.log("File1:", this.file1);
        console.log("File2:", this.file2);
        var fnca = new FileNameCompareAlgorithm(this.file1, this.file2);
        fnca.onProgress(function (message) {
            console.log("got progress", message);
        });
        this.FileComparatorService.addCompareAlgoritm(fnca);
        this.FileComparatorService.start(function (err, results) {
            if (err)
                throw err;
            console.log(results);
        });
    };
    MainController.$inject = ['$scope', 'FileComparatorService'];
    return MainController;
})();
angular.module('assignment2').controller("MainController", MainController);
