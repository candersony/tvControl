'use strict.';

function mainController($scope, irService) {
  irService.getDevices().then(function(devices){
    $scope.devices = devices;
  });

  $scope.messages = [];

  $scope.sendCommand = function (deviceName, command) {
    irService.sendCommand(deviceName, command).then(function(response){
        $scope.messages.push(response.data.stdout);
      });
  };
}

angular.module('tvControl')
    .controller('MainCtrl', mainController);
