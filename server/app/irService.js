var q = require('q'),
  irSend;

var commands = {
  UP: 'KEY_UP',
  DOWN: 'KEY_DOWN',
  LEFT: 'KEY_LEFT',
  RIGHT: 'KEY_RIGHT',
  ENTER: 'KEY_ENTER',
  SMART: 'KEY_SMART',
  BACK: 'KEY_BACK',
  VOLUME_UP: 'KEY_VOLUP',
  VOLUME_DOWN: 'KEY_VOLDOWN',
  CHANNEL_DOWN: 'KEY_CHDOWN',
  CHANNEL_UP: 'KEY_CHUP',
  STOP: 'KEY_STOP',
  PLAY: 'KEY_PLAY',
  PAUSE: 'KEY_PAUSE',
  PLAY_PAUSE: 'KEY_PLAY/PAUSE',
  FAST_FWD: 'KEY_FORWARD',
  REWIND: 'KEY_REWIND',
  RED: 'KEY_RED',
  GREEN: 'KEY_GREEN',
  YELLOW: 'KEY_YELLOW',
  BLUE: 'KEY_BLUE',
  EXIT: 'KEY_EXIT',
  MENU: 'KEY_MENU',
  MUTE: 'KEY_MUTE',
  '1': 'KEY_1',
  '2': 'KEY_2',
  '3': 'KEY_3',
  '4': 'KEY_4',
  '5': 'KEY_5',
  '6': 'KEY_6',
  '7': 'KEY_7',
  '8': 'KEY_8',
  '9': 'KEY_9',
  '0': 'KEY_0'
};

function getDevices(){
  return irSend.listDevices();
}

function getCommands(){
  var deferred = q.defer();
  deferred.resolve(Object.keys(commands));
  return deferred.promise;
}

function sendCommand(deviceName, command) {

  if(!commands.hasOwnProperty(command)){
    return q.reject(new Error('The specified command is not supported. (' + command + ')'));
  }

  return irSend.sendCommand(deviceName, commands[command]);
}

module.exports = function(irSendModule) {
  if(!irSendModule) {
    throw new Error('you must specify an ir send module');
  }

  irSend = irSendModule;

  return {
    getDevices: getDevices,
    getCommands: getCommands,
    sendCommand: sendCommand
  };
};