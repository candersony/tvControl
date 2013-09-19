'use strict.';

function mainController($scope, irService) {

  $scope.viewModel = {
    devices: null,
    selectedDevice: null,
    messages: []
  };

  irService.getDevices().then(function(devices){
    $scope.viewModel.devices = devices;
    $scope.viewModel.selectedDevice = devices[0];
  });

  $scope.sendCommand = function (command) {
    irService.sendCommand($scope.selectedDevice, command).then(function(response){
      !!response.stdout && $scope.viewModel.messages.push({ text: response.stdout, type: 'stdout' });
      !!response.stderr && $scope.viewModel.messages.push({ text: response.stderr, type: 'stderr' });
    });
  };
}

angular.module('tvControl')
    .controller('MainCtrl', mainController);
