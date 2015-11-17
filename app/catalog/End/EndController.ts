///<reference path="../../scripts/FileComparatorService"/>

class EndController {

	results: { [AlgorithmName: string]: { likeliness: number, resultDescription: string } };

	resultsArray = new Array<{
		likeliness: number,
		resultDescription: string,
		weight: number,
		name: string
	}>();

	viewDetailed = false;

	odometer = 0;
	
	resultsText = ""

	static $inject = ['$scope', '$state', '$stateParams'];
	constructor(private $scope: angular.IScope, private $state: angular.ui.IStateService, private $stateParams) {
		this.$scope['ec'] = this;

		this.results = $stateParams.results;

		if (!this.results) {
			this.$state.go("home");
			return;
		}

		this.odometer = 0;
		var total = 0;
		var totalWeight = 0;
		for (var name in this.results) {
			var algorithm = <any>window[name];
			
			var result = {
				name: name,
				likeliness: this.results[name]['likeliness'],
				resultDescription: this.results[name]['resultDescription'],
				weight: algorithm.weight || 1,
				weightedLikeliness: 0
			};
			result.weightedLikeliness = result.likeliness * result.weight;
			
			totalWeight += result.weight;
			total += result.weightedLikeliness;
			
			this.results[name]['weight'] = window[name]['weight'] || 1;
			this.results[name]['likeliness'] *= this.results[name]['weight'];

			this.resultsArray.push(result);
		}
		
		this.odometer = Math.round((total / 10) / totalWeight);
		
		if (this.odometer >= 0 && this.odometer < 4) {
			this.resultsText = "These are probably not the same file."
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
}
angular.module('assignment2').controller("EndController", EndController);