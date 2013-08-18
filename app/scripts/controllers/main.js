'use strict';

angular.module('tvControlApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/ir/devices').then(function(response){
      $scope.devices = response.data;
    });

    $scope.messages = [];

    $scope.sendCommand = function(deviceName, command) {
      var uriEncoded = {
          deviceName: encodeURIComponent(deviceName),
          command: encodeURIComponent(command)
      };

      $http.post('/ir/' + uriEncoded.deviceName + '/' + uriEncoded.command).then(function(response){
        $scope.messages.push(response.data.stdout);
      });
    };
  });
