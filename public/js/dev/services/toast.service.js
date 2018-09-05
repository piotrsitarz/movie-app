'use strict';

angular.module('moviesAppV2')

    .factory('toast', ['$http','$mdToast', function($http, $mdToast) {

        var factory = {};

        var last = {
              bottom: false,
              top: true,
              left: false,
              right: true
            };

        factory.toastPosition = angular.extend({},last);

        factory.getToastPosition = function() {
          sanitizePosition();
          return Object.keys(factory.toastPosition)
            .filter(function(pos) { return factory.toastPosition[pos]; })
            .join(' ');
        };

        function sanitizePosition() {
          var current = factory.toastPosition;
          if ( current.bottom && last.top ) current.top = false;
          if ( current.top && last.bottom ) current.bottom = false;
          if ( current.right && last.left ) current.left = false;
          if ( current.left && last.right ) current.right = false;
          last = angular.extend({},current);
        }

        var pinTo = factory.getToastPosition();

        factory.movieSaved = function() {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Movie was saved successfully to database!')
              .position(pinTo )
              .hideDelay(3000)
          );
        };

        factory.commentSaved = function() {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Comment was saved successfully to database!')
              .position(pinTo )
              .hideDelay(3000)
          );
        };

        return factory;

  }]);
