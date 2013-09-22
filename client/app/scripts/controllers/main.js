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
    irService.sendCommand($scope.viewModel.selectedDevice, command).then(function(response){
      if(!!response.stdout) {
        $scope.viewModel.messages.push({ text: response.stdout, type: 'stdout' });
      }
      if(!!response.stderr) {
        $scope.viewModel.messages.push({ text: response.stderr, type: 'stderr' });
      }
    }, function(reason){
      $scope.viewModel.messages.push({ text: reason, type: 'stderr' });
    });
  };
}

angular.module('tvControl')
    .controller('MainCtrl', ['$scope', 'irService', mainController]);
