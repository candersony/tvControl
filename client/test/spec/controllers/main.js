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
    spyOn(mockIrService, 'sendCommand').andReturn({
      then: function(callback) {
        callback({
          stdout: 'this is test stdout',
          stderr: 'this is test stderr'
        });
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
    expect(scope.viewModel.selectedDevice).toBe(mockIrService.mockDevices[0]);
  });
});
