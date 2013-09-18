'use strict';

describe('Controller: MainCtrl', function () {



    // load the controller's module
  beforeEach(module('tvControl', 'tvControlMock'));

  var MainCtrl,
    scope,
    mockIrService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _mockIrService_) {
    scope = $rootScope.$new();
    mockIrService = _mockIrService_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      irService: _mockIrService_
    });
  }));

  it('should attach a list of devices to the scope', function () {
    scope.$digest();
    expect(scope.devices.length).toBe(mockIrService.mockDevices.length);
  });
});
