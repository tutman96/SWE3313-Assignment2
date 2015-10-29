///<reference path="../../typings/tsd.d.ts"/>

class ExampleService {
	
	static $inject = ['$state']; //this will be any angular dependencies you need ($state, etc.)
	
	constructor(private $state: angular.ui.IStateService) { //all of the $inject variables will be passed into the constructor, in order
		
	}
}
angular.module('assignment2').service("ExampleService",ExampleService);