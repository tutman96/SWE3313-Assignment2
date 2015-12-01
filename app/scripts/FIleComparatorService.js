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
                var hasCalled = false;
                algorithm.on("error", function (err) {
                    if (!hasCalled)
                        callback(err);
                    hasCalled = true;
                });
                algorithm.onResults(function (results) {
                    setTimeout(function () {
                        if (!hasCalled)
                            callback(null, results);
                        hasCalled = true;
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
