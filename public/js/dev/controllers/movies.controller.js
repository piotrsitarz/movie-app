'use strict';
angular.module('moviesAppV2')

    .controller('moviesController', ['$scope', 'movies', 'comments', function($scope, movies, comments) {

      $scope.movies = movies;
      $scope.comments = comments;

    }]);
