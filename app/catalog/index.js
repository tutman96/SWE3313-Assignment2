///<reference path="../../typings/tsd.d.ts"/>
var app = angular.module("assignment2", ["ui.router", "ngFileUpload"]);
var async = require('async');
async.series([]);
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
            templateUrl: 'catalog/Home/Home.html'
        });
    }]);
