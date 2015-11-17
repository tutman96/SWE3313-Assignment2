///<reference path="../../typings/tsd.d.ts"/>
var FileComparatorService = (function () {
    function FileComparatorService() {
        this.algoritms = new Array();
    }
    FileComparatorService.prototype.addCompareAlgoritm = function (algorithm) {
        if (!(algorithm instanceof CompareAlgorithm)) {
            throw new Error(algorithm.toString() + " is not an instace of CompareAlgorithm");
        }
        this.algoritms.push(algorithm);
    };
    FileComparatorService.prototype.start = function (onFinished) {
        var functs = {};
        this.algoritms.forEach(function (algorithm) {
            functs[algorithm.constructor['name']] = function (callback) {
                algorithm.on("error", function (err) {
                    callback(err);
                });
                algorithm.onResults(function (results) {
                    setTimeout(function () {
                        callback(null, results);
                    }, 250);
                });
                algorithm.start();
            };
        });
        async.series(functs, onFinished);
    };
    FileComparatorService.$inject = [];
    return FileComparatorService;
})();
angular.module('assignment2').service("FileComparatorService", FileComparatorService);
