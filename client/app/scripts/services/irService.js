function irService($http, $q){

  function getDevices(){
    var deferred = $q.defer();

    $http.get('/ir/devices').then(function (response) {
      deferred.resolve(response.data);
    });

    return deferred.promise;
  }

  function sendCommand(deviceName, command){
    var uriEncoded = {
        deviceName: encodeURIComponent(deviceName),
        command: encodeURIComponent(command)
      },
      deferred = $q.defer();

    $http.post('/ir/' + uriEncoded.deviceName + '/' + uriEncoded.command).then(function (response) {
      deferred.resolve(response.data.stdout + ' ' + response.data.stderr);
    });

    return deferred.promise;
  }

  return {
    getDevices: getDevices,
    sendCommand: sendCommand
  };
}

angular.module('tvControl')
  .service('irService', irService);