'use strict';

angular.module('tvControlApp')
  .service('date', function () {
    return {
      getCurrentTime: function(){
        return Date.now();
      }
    };
  });
