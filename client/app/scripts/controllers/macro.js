'use strict';

angular.module('tvControlApp')
  .controller('MacroCtrl', ['$scope', 'irService', function ($scope, irService) {
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

    var recording = false;

    $scope.currentMacros = [];

    $scope.startRecording = function(){
      recording = true;
      commandRecorder.clear();
    };

    $scope.stopRecording = function(){
      recording = false;
      var macro = commandRecorder.getCommands();
      $scope.currentMacros.push(macro);
      saveMacro(macro);
    };

    function saveMacro(macro){
      irService.saveMacro(macro);
    }

    function recordCommand(device, command){
      if(recording){
        commandRecorder.addCommand(device, command);
      }
    }

    irService.onSendCommand(recordCommand);
    irService.getMacros().then(function(macros){
      $scope.currentMacros = macros;
    });
  }]);
