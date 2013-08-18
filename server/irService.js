var q = require('q')
    exec = require('child_process').exec;

var devices = {};

function getDevices(){
    var defered = q.defer();

    exec('irsend LIST', function(error, stdout, stderr){

        defered.resolve(devices);
    });

    return defered.promise;
}

function getDevice(name){
    var defered = q.defer();

    if(!!devices && !!devices[name]){
        defered.resolve(devices[name]);
    }
    else{
        getDevices().then(function(newDevices){
           defered.resolve(newDevices[name]);
        });
    }

    return defered.promise;
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