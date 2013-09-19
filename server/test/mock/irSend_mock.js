var q = require('q');

var devices = ['samsung', 'lg', 'toshiba', 'phillips', 'panasonic'],
  commands = ['KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT', 'KEY_ENTER'];

module.exports = {
  listDevices: function(){
    var deferred = q.defer();
    deferred.resolve(devices);
    return deferred.promise;
  },
  listDeviceCommands: function() {
    var deferred = q.defer();
    deferred.resolve(commands);
    return deferred.promise;
  },
  sendCommand: function(){
    var deferred = q.defer();
    deferred.resolve({
      stdout: 'this is mock stdout',
      stderr: 'this is mock stderr'
    });
    return deferred.promise;
  },
  devices: devices,
  commands: commands
};