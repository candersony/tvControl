'use strict';

describe('Service: date', function () {

  // load the service's module
  beforeEach(module('tvControlApp'));

  // instantiate service
  var date;
  beforeEach(inject(function($injector) {
    date = $injector.get('date');
  }));

  describeInterface('date service', {
    getCurrentTime: function(){}
  }, function(){ return date; });

  it('should get the current time in ms', function () {
    expect(date.getCurrentTime()).toBe(Date.now());
  });

});
