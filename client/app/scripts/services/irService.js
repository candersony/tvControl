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

    callSendCommandEventHandlers(deviceName, command);

    return $http.post('/ir/' + uriEncoded.deviceName + '/' + uriEncoded.command).then(function (response) {
      return response.data;
    });
  }

  var sendCommandEventHandlers = [];

  function callSendCommandEventHandlers(device, command){
    angular.forEach(sendCommandEventHandlers, function(sendCommandEventHandler){
      sendCommandEventHandler(device, command);
    });
  }

  function onSendCommand(eventHandler){
    sendCommandEventHandlers .push(eventHandler);
  }

  function saveMacro(macro){
    return $http.post('/ir/macro', macro).then(function (response) {
      return response.data;
    });
  }

  function getMacros(){
    return $http.get('/ir/macro').then(function (response) {
      return response.data;
    });
  }
  return {
    getDevices: getDevices,
    getCommands: getCommands,
    sendCommand: sendCommand,
    onSendCommand: onSendCommand,
    saveMacro: saveMacro,
    getMacros: getMacros
  };
}

angular.module('tvControlApp')
  .service('irService', ['$http', irService]);