'use strict';

angular.module('tvControlApp')
  .service('Timer', ['date', function (date) {
    var startTime = null,
      stopTime = null;

    return {
      start: function(){
        startTime = date.getCurrentTime();
      },
      stop: function(){
        stopTime = date.getCurrentTime();
      },
      getRecordedDuration: function(){
        return stopTime - startTime;
      }
    };
  }]);
