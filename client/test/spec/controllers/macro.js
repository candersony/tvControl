'use strict';

describe('Controller: MacroCtrl', function () {

  // load the controller's module
  beforeEach(module('tvControlApp'));
  beforeEach(module(function($provide) {
    $provide.service('date', function(){
      var currentTime = 200;

      return {
        getCurrentTime: function(){
          var actualCurrentTime = currentTime;
          currentTime = currentTime + 200;
          return actualCurrentTime;
        }
      };
    });
  }));

  var MacroCtrl,
    scope,
    $httpBackend,
    irService,
    savedMacros = [{ device: 'samsung', commands: ['up', 'down', 'left', 'right']}];

  function setupIrServiceBackend($httpBackend){
    $httpBackend.when('GET', '/ir/macro').respond(angular.copy(savedMacros));
    $httpBackend.when('POST', /\/ir\/(\w+)\/(\w+)/).respond('');
    $httpBackend.when('POST', '/ir/macro').respond('saved');
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    irService = $injector.get('irService');

    $httpBackend = $injector.get('$httpBackend');

    setupIrServiceBackend($httpBackend);

    scope = $rootScope.$new();
    MacroCtrl = $controller('MacroCtrl', {
      $scope: scope,
      irService: irService
    });

    $httpBackend.flush();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describeInterface('macro controller scope', {
    startRecording: function(){},
    stopRecording: function(){},
    currentMacros: [],
    isRecording: false
  }, function(){ return scope; });

  describe('Macro controller functionality', function(){
    it('should load the currently available macros on start up', function(){
      expect(scope.currentMacros).toEqual(savedMacros);
    });

    it('should record a macro and update the available macros', function(){
      var currentDevice = 'samsung2',
          commands =['up', 'down', 'left', 'right'];

      scope.startRecording();

      angular.forEach(commands, function(command){
        irService.sendCommand(currentDevice, command);
        $httpBackend.flush();
      });

      scope.stopRecording();

      $httpBackend.flush();

      var expectedCurrentMacros = angular.copy(savedMacros);
      expectedCurrentMacros.push({ device: currentDevice, commands: ['up', 'sleep 200', 'down', 'sleep 200', 'left', 'sleep 200', 'right']});

      expect(scope.currentMacros).toEqual(expectedCurrentMacros);
    });

    it('should throw an exception if the device is changed while recording a macro', function(){

      scope.startRecording();

      irService.sendCommand('samsung', 'enter');
      $httpBackend.flush();

      expect(function(){ irService.sendCommand('samsung2', 'enter'); }).toThrow();
    });

    it('should correctly report when recording is in progress', function () {
      expect(scope.isRecording).toBe(false);

      scope.startRecording();

      expect(scope.isRecording).toBe(true);

      scope.stopRecording();
      $httpBackend.flush();

      expect(scope.isRecording).toBe(false);
    });
  });
});
