class MainController {
	
	static $inject = ['$scope'];
	constructor (private $scope: angular.IScope) {
		this.$scope['mc'] = this;
	}
}
angular.module('assignment2').controller("MainController",MainController);