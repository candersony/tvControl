var q = require('q'),
  util = require('util'),
  exec = require('child_process').exec;

function listDevices(){
  var deferred = q.defer();

  exec('irsend LIST "" ""', function (error, stdout, stderr){
    var deviceNames = stderr.toString().replace('irsend:', '').split(' ');
    deferred.resolve(deviceNames);
  });

  return deferred.promise;
}

function listDeviceCommands(deviceName){
  var deferred = q.defer();

  exec(util.format('irsend LIST "%s" ""', deviceName), function (error, stdout, stderr){

    var commands = stderr.toString().match(/key_[^\s\n]+/ig);

    deferred.resolve(commands);
  });

  return deferred.promise;
}

function sendCommand(deviceName, command) {
  var deferred = q.defer();

  exec('irsend SEND_ONCE ' + deviceName + ' ' + command.toUpperCase(), function(error, stdout, stderr){
    deferred.resolve({
      stdout: stdout.toString(),
      stderr: stderr.toString()
    });
  });

  return deferred.promise;
}

module.exports = {
  listDevices: listDevices,
  listDeviceCommands: listDeviceCommands,
  sendCommand: sendCommand
};