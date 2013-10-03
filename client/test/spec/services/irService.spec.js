'use strict';

describe('Service: irService', function () {


  // load the controller's module
  beforeEach(module('tvControl'));

  var irServiceInstance;

  beforeEach(inject(function(irService){
    irServiceInstance = irService;
  }));

  describe('interface', function(){
    it('getDevices should be a function', function(){
      expect(typeof irServiceInstance.getDevices).toBe('function');
    });
    it('getCommands should be a function', function(){
      expect(typeof irServiceInstance.getCommands).toBe('function');
    });
    it('sendCommand should be a function', function(){
      expect(typeof irServiceInstance.sendCommand).toBe('function');
    });
    it('on should be a function', function(){
      expect(typeof irServiceInstance.on).toBe('function');
    });
  });


});