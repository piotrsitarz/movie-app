'use strict';
var app = angular.module('moviesAppV2', ['ui.router','ngMessages','ngMaterial',])

  .config(['$stateProvider','$urlRouterProvider','$locationProvider', function ($stateProvider,$urlRouterProvider,$locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
    .state('movies', {
        url: '/',
        views: {
          headerView: {
              templateUrl: '/views/header.html',
              controller: 'headerController'
          },
          mainView: {
              templateUrl: '/views/main.html',
              controller: 'moviesController'
          }
        }
    });

  $urlRouterProvider.otherwise('/');

  }]);
