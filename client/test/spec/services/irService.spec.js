'use strict';

describe('Service: irService', function () {


  // load the controller's module
  beforeEach(module('tvControlApp'));

  var irService, $httpBackend;

  beforeEach(inject(function($injector){
    irService = $injector.get('irService');

    $httpBackend = $injector.get('$httpBackend');


  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('interface', function(){
    it('getDevices should be a function', function(){
      expect(typeof irService.getDevices).toBe('function');
    });
    it('sendCommand should be a function', function(){
      expect(typeof irService.sendCommand).toBe('function');
    });
    it('onSendCommand should be a function', function(){
      expect(typeof irService.onSendCommand).toBe('function');
    });
  });

  describe('the sendCommand function', function(){
    it('should send a command', function(){

      $httpBackend.when('POST', '/ir/samsung/enter').respond('command executed');

      var response;

      irService.sendCommand('samsung', 'enter').then(function(r){
        response = r;
      });

      $httpBackend.flush();

      expect(response).toBe('command executed');
    });
  });

  describe('the onSendCommand function', function(){
    it('should call an event handler when a command is sent', function(){
      var mockEventLister = { fn: angular.noop };
      spyOn(mockEventLister, 'fn');
      $httpBackend.when('POST', '/ir/samsung/enter').respond('');

      irService.onSendCommand(mockEventLister.fn);
      irService.sendCommand('samsung', 'enter');

      $httpBackend.flush();

      expect(mockEventLister.fn).toHaveBeenCalledWith('samsung', 'enter');
    });
  });

  describe('the getDevices function', function(){
    it('should return a list of devices', function(){

      var testDevices = ['samsung'];
      $httpBackend.when('GET', '/ir/devices').respond(testDevices);

      var devices;

      irService.getDevices().then(function(newDevices){
        devices = newDevices;
      });

      $httpBackend.flush();

      expect(devices).toBe(testDevices);
    });
  });
});