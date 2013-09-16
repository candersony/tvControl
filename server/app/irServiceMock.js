var q = require('q');

var devices = {
  'samsung': {
    name: 'samsung',
    commands: [{
      name: 'Power',
      code: 'KEY_POWER'
    }, {
      name: 'Up',
      code: 'KEY_UP'
    }, {
      name: 'Down',
      code: 'KEY_DOWN'
    }, {
      name: 'Left',
      code: 'KEY_LEFT'
    }, {
      name: 'Right',
      code: 'KEY_RIGHT'
    }, {
      name: 'Enter / OK',
      code: 'KEY_ENTER/OK'
    }
   ]
  }
};

function getDevices(){
  var deferred = q.defer();

  deferred.resolve(devices);

  return deferred.promise;
}

function getDevice(name){
  var deferred = q.defer();

  deferred.resolve(devices[name]);

  return deferred.promise;
}

function sendCommand(deviceName, command) {
  var deferred = q.defer();

  var message = 'Command Sent to ' + deviceName + ' : ' + command;
  console.log(message);

  deferred.resolve({
    error: null,
    stdout: message,
    stderr: null
  });

  return deferred.promise;
}

module.exports = {
  getDevices: getDevices,
  getDevice: getDevice,
  sendCommand: sendCommand
};
