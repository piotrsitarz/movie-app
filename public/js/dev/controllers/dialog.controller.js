'use strict';
angular.module('moviesAppV2')

    .controller('dialogController', ['$scope','$mdDialog', 'comments', 'randomName','movies', function($scope,$mdDialog, comments, randomName, movies) {

      $scope.comments = comments;
      $scope.randomName = randomName;
      $scope.movies = movies;
      $scope.movieTitleToDelete = movies.toDelete.title;
      $scope.commentContentToDelete = comments.toDelete.content;

      $scope.dialogHide = function() {
        $mdDialog.hide();
      }

      $scope.confirmedDeleteMovie = function() {
        $mdDialog.hide();
        movies.deleteMovie();
      }

      $scope.confirmedDeleteComment = function() {
        $mdDialog.hide();
        comments.deleteComment();
      }

    }]);
