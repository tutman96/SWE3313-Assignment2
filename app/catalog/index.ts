///<reference path="../../typings/tsd.d.ts"/>

var app = angular.module("assignment2", ["ui.router","ngFileUpload"]);
import async = require('async');
async.series([]);
app.config(['$stateProvider', '$locationProvider',
	($stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider) => {
		if (location.hash == "") location.hash = "#/home";
		
		$stateProvider
			.state('main', {
				abstract: true,
				templateUrl: "catalog/Main/Main.html",
				controller: "MainController"
			})
			.state ('home', {
				parent: 'main',
				url: '/home',
				templateUrl: 'catalog/Home/Home.html'
			})
		
	}]);