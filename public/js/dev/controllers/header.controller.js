'use strict';

angular.module('moviesAppV2')

  .controller('headerController', ['$scope','movies','comments', function($scope,movies,comments) {

    $scope.movies = movies;
    $scope.comments = comments;

  }]);
