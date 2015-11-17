///<reference path="../../scripts/FileComparatorService"/>
var AlgorithmStatus;
(function (AlgorithmStatus) {
    AlgorithmStatus[AlgorithmStatus["Running"] = 0] = "Running";
    AlgorithmStatus[AlgorithmStatus["Finished"] = 1] = "Finished";
    AlgorithmStatus[AlgorithmStatus["Error"] = 2] = "Error";
})(AlgorithmStatus || (AlgorithmStatus = {}));
var ResultsController = (function () {
    function ResultsController($scope, $state, $stateParams, FileComparatorService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.FileComparatorService = FileComparatorService;
        this.titleText = "Processing...";
        this.algorithms = [
            // FileNameCompareAlgorithm,
            // FileHashCompareAlgorithm,
            BinaryExpressionCompareAlgorithm,
            VariableDeclaratorComparisonAlgorithm,
            CallExpressionComparisonAlgorithm,
            LiteralComparisonAlgorithm,
            FunctionDeclarationComparisonAlgorithm
        ];
        this.results = new Array();
        this.$scope['rc'] = this;
        console.log($stateParams);
        this.file1 = $stateParams['file1'];
        this.file2 = $stateParams['file2'];
        if (typeof this.file1 == "string" || typeof this.file2 == "string") {
            this.$state.go("home");
            return;
        }
        this.algorithms.forEach(function (algorithmClass) {
            var al = new algorithmClass(_this.file1, _this.file2);
            var result = {
                name: al.constructor['name'],
                progress: null,
                status: AlgorithmStatus.Running,
                likeliness: 0,
                resultDescription: ""
            };
            _this.results.push(result);
            al.onProgress(function (progress) {
                _this.safeApply(function () {
                    result.progress = progress;
                });
            });
            al.onResults(function (algorithmResults) {
                console.log("Results:", algorithmResults);
                _this.safeApply(function () {
                    result.status = AlgorithmStatus.Finished;
                    result.likeliness = algorithmResults.likeliness;
                    result.resultDescription = algorithmResults.resultDescription;
                });
            });
            al.on("error", function (err) {
                _this.safeApply(function () {
                    result.status = AlgorithmStatus.Error;
                    result.resultDescription = err.message;
                });
            });
            _this.FileComparatorService.addCompareAlgoritm(al);
        });
        setTimeout(function () {
            _this.FileComparatorService.start(function (err, results) {
                _this.safeApply(function () {
                    _this.titleText = "Compiling results...";
                });
                setTimeout(function () {
                    _this.$state.go("end", {
                        results: results
                    });
                }, 1000);
            });
        }, 500);
    }
    ResultsController.prototype.safeApply = function (fn) {
        var phase = this.$scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        }
        else {
            this.$scope.$apply(fn);
        }
    };
    ;
    ResultsController.$inject = ['$scope', '$state', '$stateParams', 'FileComparatorService'];
    return ResultsController;
})();
angular.module('assignment2').controller("ResultsController", ResultsController);
angular.module('assignment2').filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) : '';
    };
});
