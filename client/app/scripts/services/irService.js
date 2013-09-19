function irService($http){

  function getDevices(){
    return $http.get('/ir/devices').then(function (response) {
      return response.data;
    });
  }

  function getCommands(){
    return $http.get('/ir/commands').then(function (response) {
      return response.data;
    });
  }

  function sendCommand(deviceName, command){
    var uriEncoded = {
        deviceName: encodeURIComponent(deviceName),
        command: encodeURIComponent(command)
      };

    return $http.post('/ir/' + uriEncoded.deviceName + '/' + uriEncoded.command).then(function (response) {
       return response.data;
    });
  }

  return {
    getDevices: getDevices,
    getCommands: getCommands,
    sendCommand: sendCommand
  };
}

angular.module('tvControl')
  .service('irService', irService);