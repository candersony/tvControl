'use strict';

angular.module('tvControlApp')
  .service('timer', ['date', function (date) {
    var startTime = null,
      stopTime = null,
        timerStarted = false;

    return {
      start: function(){
        timerStarted = true;
        startTime = date.getCurrentTime();
      },
      stop: function(){
        if(timerStarted) {
          timerStarted = false;
          stopTime = date.getCurrentTime();
        }
      },
      getRecordedDuration: function(){
        return stopTime - startTime;
      }
    };
  }]);
