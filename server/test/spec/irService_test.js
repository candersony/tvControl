var irSendMock = require('../mock/irSend_mock'),
  irService = require('../../app/irService');

exports['should throw an exception if an irSend module is not passed in'] = function (test) {
  test.throws(function(){
    irService();
  }, Error, 'Should fail without an irSend module');

  test.done();
};

exports['The irSevice'] = (function(){
  var irServiceInstance;

  return {
    setUp: function(callback){
      irServiceInstance = irService(irSendMock);
      callback();
    },
    'should return promises from all functions': function(test){
      function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
      }

      var getDevicesThen = irServiceInstance.getDevices().then;
      var getCommandsThen = irServiceInstance.getCommands().then;
      var sendCommandThen = irServiceInstance.sendCommand().then;

      test.ok(isFunction(getDevicesThen), 'getDevices should return a promise');
      test.ok(isFunction(getCommandsThen), 'getCommands should return a promise');
      test.ok(isFunction(sendCommandThen), 'sendCommands should return a promise');

      test.done();
    },
    'should return a list of devices': function(test){
      irServiceInstance.getDevices().then(function(devices){
        test.equals(devices, irSendMock.devices);
        test.done();
      });
    },
    'should return a list of commands': function(test){
      irServiceInstance.getCommands().then(function(commands){
        test.ok(commands.length > 0, 'commands should be an array greater than zero');
        test.done();
      });
    },
    'should send a command': function(test){
      irServiceInstance.sendCommand('samsung', 'UP').then(function(result){
        test.equal(result.stdout, 'this is mock stdout');
        test.equal(result.stderr, 'this is mock stderr');
        test.done();
      });
    },
    'should fail when an invalid command is sent': function(test){
      irServiceInstance.sendCommand('samsung', 'CHEESE').then(function(){}, function(reason){
        test.equal(reason.message, 'The specified command is not supported. (CHEESE)');
        test.done();
      });
    },
    'should fail when no command is sent': function(test){
      irServiceInstance.sendCommand('samsung').then(function(){}, function(reason){
        test.equal(reason.message, 'The specified command is not supported. (undefined)');
        test.done();
      });
    }
  };

})();