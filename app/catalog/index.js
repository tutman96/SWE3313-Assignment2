///<reference path="../../typings/tsd.d.ts"/>
var app = angular.module("assignment2", ["ui.router", "ngFileUpload", "ui.odometer"]);
var async = require('async');
var crypto = require('crypto');
var fs = require('fs');
doNothing(async, crypto, fs);
function doNothing() {
    var anything = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        anything[_i - 0] = arguments[_i];
    }
}
app.config(['$stateProvider', '$locationProvider',
    function ($stateProvider, $locationProvider) {
        if (location.hash == "")
            location.hash = "#/home";
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
        });
    }]);
