///<reference path="../../typings/tsd.d.ts"/>

var app = angular.module("assignment2", ["ui.router", "ngFileUpload", "ui.odometer"]);
import async = require('async');
import crypto = require('crypto');
import fs = require('fs');

doNothing(async, crypto, fs);

function doNothing(...anything) { }

app.config(['$stateProvider', '$locationProvider',
	($stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider) => {
		if (location.hash == "") location.hash = "#/home";

		$stateProvider
			.state('main', {
				abstract: true,
				templateUrl: "catalog/Main/Main.html",
				controller: "MainController"
			})
			.state('home', {
				parent: 'main',
				url: '/home',
				templateUrl: 'catalog/Home/Home.html',
				controller: "HomeController"
			})
			.state('results', {
				parent: 'main',
				url: '/results',
				templateUrl: 'catalog/Results/Results.html',
				controller: "ResultsController",
				params: {
					file1: "",
					file2: ""
				}
			})
			.state('end', {
				parent: 'main',
				url: '/end',
				templateUrl: 'catalog/End/End.html',
				controller: "EndController",
				params: {
					results: null
				}
			})
	}]);

document.addEventListener('dragover', function(event) {
    event.preventDefault();
    return false;
}, false);

document.addEventListener('drop', function(event) {
    event.preventDefault();
    return false;
}, false);