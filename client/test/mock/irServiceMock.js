'use strict';

angular.module('tvControlMock', [])
  .service('mockIrService', function mockIrService($q){
    var devices = ['samsung', 'lg', 'toshiba', 'phillips', 'panasonic'];

    function getDevices() {
      var deferred = $q.defer();

      deferred.resolve(devices);

      return deferred.promise;
    }

    function sendCommand(deviceName, command) {
      var deferred = $q.defer();

      deferred.resolve({
        stdout: deviceName + ' : ' + command,
        stderr: deviceName + ' : ' + command
      });

      return deferred.promise;
    }

    return {
      getDevices: getDevices,
      sendCommand:sendCommand,
      mockDevices: devices
    };
  });