var q = require('q')
    exec = require('child_process').exec,
    util = require('util');

var devices;

function getDevices(){
  var deferred = q.defer();

  if(!!devices){
    deferred.resolve(devices);
  }
  else{
    devices = {};

    exec('irsend LIST "" ""', function(error, stdout, stderr){
      var deviceNames = stderr.toString().replace('irsend:', '').split(' ');

      for(var i in deviceNames) {
        var deviceName = deviceNames[i],
            cmd = util.format('irsend LIST "%s" ""', deviceName);

        exec(cmd, function(error, stdout, stderr) {
          var commands = stderr.toString().match(/key_[^\s\n]+/ig);
          devices[deviceName] = {
            name: deviceName,
            commands: commands
          };

          deferred.resolve(devices);
        });
      }
    });
  }

  return deferred.promise;
}

function getDevice(name){
    var deferred = q.defer();

    if(!!devices && !!devices[name]){
        deferred.resolve(devices[name]);
    }
    else{
        getDevices().then(function(newDevices){
           deferred.resolve(newDevices[name]);
        });
    }

    return deferred.promise;
}

function sendCommand(deviceName, command) {
    var deferred = q.defer();

    var message = 'Command Sent to ' + deviceName + ' : ' + command;
    console.log(message);

    exec('irsend SEND_ONCE ' + deviceName + ' ' + command.toUpperCase(), function(error, stdout, stderr){
        deferred.resolve({
            error: error,
            stdout: stdout.toString(),
            stderr: stderr.toString()
        });
    });

    return deferred.promise;
}

module.exports = {
    getDevices: getDevices,
    getDevice: getDevice,
    sendCommand: sendCommand
};