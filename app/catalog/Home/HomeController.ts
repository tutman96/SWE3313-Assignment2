///<reference path="../../scripts/FileComparatorService"/>

class HomeController {

	file1: File;
	file2: File;

	static $inject = ['$scope','$state'];
	constructor(private $scope: angular.IScope, private $state: angular.ui.IStateService) {
		this.$scope['hc'] = this;
	}

	start() {
		this.$state.go("results", {
			file1: this.file1,
			file2: this.file2
		})
	}
}
angular.module('assignment2').controller("HomeController", HomeController);