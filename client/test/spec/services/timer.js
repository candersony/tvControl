'use strict';

describe('Service: timer', function () {

  // load the service's module
  beforeEach(module('tvControlApp'));

  beforeEach(module(function($provide) {
    $provide.service('date', function(){
      var currentTime = 0;

      return {
        getCurrentTime: function(){
          var actualCurrentTime = currentTime;
          currentTime = currentTime + 200;
          return actualCurrentTime;
        }
      };
    });
  }));

  // instantiate service
  var timer = null,
      getTimerInstance = function() { return timer; };

  beforeEach(inject(function($injector) {
    timer = $injector.get('Timer');
  }));

  describeInterface('timer', {
    start: function(){},
    stop: function(){},
    getRecordedDuration: function(){}
  }, getTimerInstance);

  describe('the Timer service functionality', function(){

    it('should record an interval of time and report the duration', function(){
      timer.start();
      timer.stop();
      var duration = timer.getRecordedDuration();

      expect(duration).toBe(200);
    });
  });
});
