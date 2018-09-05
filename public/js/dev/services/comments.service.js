'use strict';

angular.module('moviesAppV2')

  .factory('comments', ['$http', '$mdDialog', 'randomName', 'toast', 'movies',  function($http, $mdDialog, randomName, toast, movies) {

      var factory = {};

      factory.randomName = randomName;
      factory.toast = toast;
      factory.movies = movies;
      factory.toAdd = {};
      factory.toDelete = {};
      factory.toDelete.content = '';

      factory.add = function(ev, idOfMovie, titleOfMovie) {
        randomName.content = randomName.generate();
        factory.idOfMovie = idOfMovie;
        factory.titleOfMovie = titleOfMovie;
        factory.toAdd.vote = '';
        factory.toAdd.content = '';
        alert = $mdDialog.alert({
          controller: 'dialogController',
          templateUrl: '/views/comments_add_dialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          escapeToClose: true
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      factory.delete = function(comment) {
        factory.toDelete = {};
        factory.toDelete.content = comment.content;
        factory.toDelete.id = comment._id;
        alert = $mdDialog.alert({
          controller: 'dialogController',
          templateUrl: '/views/comments_delete_dialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          escapeToClose: false
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      factory.deleteComment= function() {
        $http.post('/commentDelete', factory.toDelete).then(function successCallback(response) {
          factory.getAll();
        });
      };

      factory.save = function(user, content, vote) {
        $mdDialog.hide();
        var commentToSave = {
          user:randomName.content,
          content:content,
          vote:vote,
          idOfMovie:factory.idOfMovie,
          titleOfMovie:factory.titleOfMovie
        };
        $http.post('/comments', commentToSave).then(function successCallback(response) {
          toast.commentSaved();
        });
      };

      factory.getAll = function() {
        $http.get('/comments').then(function successCallback(response) {
          factory.all = response.data;
          factory.showCommentsList = true;
        });
      };

      return factory;

  }]);
