'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
  beforeEach(module('tvControlApp'));

  var MainCtrl,
    scope,
    mockIrService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    mockIrService = {
      getDevices: angular.noop,
      sendCommand: angular.noop,
      mockDevices: ['samsung', 'lg', 'toshiba', 'phillips', 'panasonic']
    };
    spyOn(mockIrService, 'getDevices').andReturn({
      then: function(callback){
        callback(mockIrService.mockDevices);
      }
    });


    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      irService: mockIrService
    });
    scope.$digest();
  }));

  describeInterface('main controller scope', {
    viewModel: {},
    sendCommand: function(){}
  }, function(){ return scope; });

  it('should attach a list of devices to the scope', function () {
    expect(scope.viewModel.devices.length).toBe(mockIrService.mockDevices.length);
  });

  it('should set the first device in the list of devices as the selected device', function(){
    expect(scope.viewModel.selectedDevice).toBe(mockIrService.mockDevices[0]);
  });

  it('should send a command to the selected device', function(){
    spyOn(mockIrService, 'sendCommand').andReturn({ then: function() { } });

    scope.viewModel.selectedDevice = 'samsung';
    scope.sendCommand('enter');

    expect(mockIrService.sendCommand.calls.length).toBe(1);
    expect(mockIrService.sendCommand).toHaveBeenCalledWith('samsung', 'enter');
  });

  it('should send a command and add a stdout message to the view model', function(){
    spyOn(mockIrService, 'sendCommand').andReturn({
      then: function(successCallback) {
        successCallback({
          stdout: 'this is test stdout'
        });
      }
    });

    scope.sendCommand('enter');

    expect(scope.viewModel.messages[0]).toEqual({ text: 'this is test stdout', type: 'stdout'});
  });

  it('should send a command and add a stderr message to the view model', function(){
    spyOn(mockIrService, 'sendCommand').andReturn({
      then: function(successCallback) {
        successCallback({
          stderr: 'this is test stderr'
        });
      }
    });

    scope.sendCommand('enter');

    expect(scope.viewModel.messages[0]).toEqual({ text: 'this is test stderr', type: 'stderr'});
  });

  it('should send a command and add a promise rejection error message to the view model', function(){
    spyOn(mockIrService, 'sendCommand').andReturn({
      then: function(successCallback, errorCallback) {
        errorCallback('this is test error reason');
      }
    });

    scope.sendCommand('enter');

    expect(scope.viewModel.messages[0]).toEqual({ text: 'this is test error reason', type: 'stderr'});
  });
});
