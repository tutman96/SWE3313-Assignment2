///<reference path="../../scripts/FileComparatorService"/>
var EndController = (function () {
    function EndController($scope, $state, $stateParams) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.resultsArray = new Array();
        this.viewDetailed = false;
        this.odometer = 0;
        this.resultsText = "";
        this.$scope['ec'] = this;
        this.results = $stateParams.results;
        if (!this.results) {
            this.$state.go("home");
            return;
        }
        this.odometer = 0;
        var total = 0;
        var totalConfidence = 0;
        var i = 0;
        for (var name in this.results) {
            var algorithm = window[name];
            var result = {
                i: i++,
                name: algorithm.algorithmName || name,
                likeliness: this.results[name].likeliness,
                resultDescription: this.results[name].resultDescription,
                confidence: this.results[name].confidence,
                confidenceBoostedLikeliness: 0
            };
            result.confidenceBoostedLikeliness = result.likeliness * result.confidence;
            totalConfidence += result.confidence;
            total += result.confidenceBoostedLikeliness;
            this.resultsArray.push(result);
        }
        this.odometer = Math.round((total / 10) / totalConfidence);
        if (this.odometer >= 0 && this.odometer < 4) {
            this.resultsText = "These are probably not the same file.";
        }
        else if (this.odometer >= 4 && this.odometer < 7) {
            this.resultsText = "These file could be the same, however unlikely";
        }
        else if (this.odometer >= 7 && this.odometer < 10) {
            this.resultsText = "These files are probably the same. Someone worked hard to try to not get caught though";
        }
        else {
            this.resultsText = "Yup! This is the same code!";
        }
    }
    EndController.prototype.goHome = function () {
        this.$state.go("home");
    };
    EndController.$inject = ['$scope', '$state', '$stateParams'];
    return EndController;
})();
angular.module('assignment2').controller("EndController", EndController);
