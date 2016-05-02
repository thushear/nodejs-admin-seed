'use strict';

var app = angular.module('app', ['ngRoute','app.controllers',"bw.paging"]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',{templateUrl:'/views/tpl/welcome.html',controller:'IndexCtrl'})
        .when('/timeline', {templateUrl: '/views/tpl/timeline.html', controller: 'WelcomeCtrl'})
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);
