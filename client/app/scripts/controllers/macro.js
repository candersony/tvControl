'use strict';

angular.module('tvControlApp')
  .controller('MacroCtrl', ['$scope', 'irService', 'timer', function ($scope, irService, timer) {
    var commandRecorder = (function(){
      var recordedCommands = [],
        currentDevice = null;

      return {
        clear: function clear(){
          recordedCommands = [];
          currentDevice = null;
        },
        addCommand: function addCommand(device, command){
          if(currentDevice !== null && device !== currentDevice){
            throw 'Device changed while recording macro';
          }

          currentDevice = device;
          recordedCommands.push({ device: device, command: command});
        },
        getCommands: function getCommands(){
          var macro = {
            device: '',
            commands: []
          };

          angular.forEach(recordedCommands, function(recordedCommand){
            macro.commands.push(recordedCommand.command);
            macro.device = recordedCommand.device;
          });

          return macro;
        }
      };
    })();

    $scope.isRecording = false;
    $scope.currentMacros = [];

    $scope.startRecording = function(){
      $scope.isRecording = true;
      commandRecorder.clear();
    };

    $scope.stopRecording = function(){
      $scope.isRecording = false;
      var macro = commandRecorder.getCommands();
      $scope.currentMacros.push(macro);
      saveMacro(macro);
    };

    function saveMacro(macro){
      irService.saveMacro(macro);
    }

    function recordCommand(device, command){
      if($scope.isRecording){
        timer.stop();
        var timeBetweenLastCommand = timer.getRecordedDuration();

        if(timeBetweenLastCommand > 0){
          commandRecorder.addCommand(device, 'sleep ' + timeBetweenLastCommand);
        }

        commandRecorder.addCommand(device, command);

        timer.start();
      }
    }

    irService.onSendCommand(recordCommand);
    irService.getMacros().then(function(macros){
      $scope.currentMacros = macros;
    });
  }]);
