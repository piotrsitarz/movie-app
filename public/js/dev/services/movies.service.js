'use strict';

angular.module('moviesAppV2')

  .factory('movies', ['$http', '$mdDialog','$mdToast','toast', function($http, $mdDialog, $mdToast, toast) {

      var factory = {};

      factory.toast = toast;
      factory.sortProperties = ['Year','IMDB Rating'];
      factory.increasing = true;
      factory.intro = true;
      factory.toDelete = {};
      factory.toDelete.title = '';

      factory.search = function(title, year) {
        var movie = {};
        if (year) {
          movie = {
            title:title,
            year:year
          };
        } else {
          movie = {
            title:title
          };
        }
        $http.post('/moviesSearch', movie).then(function successCallback(response) {
          if (response.data.Response === 'False') {
              alert = $mdDialog.alert({
                title: 'Sorry!',
                textContent: 'Movie with that title does not exist in the datastore. Please type once again.',
                ok: 'Close'
              });
              $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
              });
          } else {
            factory.found = response.data;
            factory.movieFound = true;
            factory.showMoviesList = false;
            factory.intro = false;
          }
          factory.title = '';
          factory.year = '';
        });
      };

      factory.save = function(movie) {
        $http.post('/movieSave', movie).then(function successCallback(response) {
          if (response.data === 'exist') {
            alert = $mdDialog.alert({
              title: 'Sorry!',
              textContent: 'Movie with that title already exist in the database. Failed to save.',
              ok: 'Close'
            });
            $mdDialog
              .show(alert)
              .finally(function() {
                  alert = undefined;
            });
          } else {
            toast.movieSaved();
          }
        });
      };

      factory.delete = function(movie) {
        factory.toDelete.title = movie.Title;
        factory.toDelete.id = movie._id;
        alert = $mdDialog.alert({
          controller: 'dialogController',
          templateUrl: '/views/movies_delete_dialog.html',
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

      factory.getAll = function() {
        $http.get('/movies').then(function successCallback(response) {
          factory.all = response.data;
          factory.showMoviesList = true;
          factory.movieFound = false;
          factory.intro = false;
        });
      };

      factory.show = function(_id) {
        $http.post('/movieShow', {_id:_id}).then(function successCallback(response) {
          factory.found = response.data;
          factory.movieFound = true;
          factory.showMoviesList = false;
        });
      }

      factory.getGenres = function() {
        $http.get('/movies').then(function successCallback(response) {
          factory.genres = [];
          response.data.forEach(function(movie) {
            movie.Genre = movie.Genre.replace(/ /g,'');
            var genres = movie.Genre.split(',');
            genres.forEach(function(genre) {
              if (!factory.genres.includes(genre)) {
                factory.genres.push(genre);
              }
            });
          });
        });
      };

      factory.deleteMovie= function() {
        $http.post('/movieDelete', factory.toDelete).then(function successCallback(response) {
          factory.getAll();
        });
      };

      factory.getGenres();

      return factory;

  }]);
