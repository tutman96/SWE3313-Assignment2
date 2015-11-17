///<reference path="../../scripts/FileComparatorService"/>

class EndController {

	results: { [AlgorithmName: string]: { likeliness: number, resultDescription: string } };
	
	resultsArray = new Array<{
		likeliness: number,
		resultDescription: string,
		name: string
	}>();
	
	viewDetailed = false;

	static $inject = ['$scope', '$state', '$stateParams'];
	constructor(private $scope: angular.IScope, private $state: angular.ui.IStateService, private $stateParams) {
		this.$scope['ec'] = this;

		this.results = $stateParams.results;
		
		if (!this.results) {
			this.$state.go("home");
			return;
		}
		
		for (var name in this.results) {
			this.results[name]['name'] = name;
			this.resultsArray.push(<any>this.results[name]);
		}
	}
}
angular.module('assignment2').controller("EndController", EndController);