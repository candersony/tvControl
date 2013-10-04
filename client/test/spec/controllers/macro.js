'use strict';

describe('Controller: MacroCtrl', function () {

  // load the controller's module
  beforeEach(module('tvControlApp'));

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

  describe('scope structure', function(){
    var scopeStructure = {
      startRecording: function(){},
      stopRecording: function(){},
      currentMacros: []
    },
    allProperties = [];

    angular.forEach(scopeStructure, function(property, propertyName){
      if(!scopeStructure.hasOwnProperty(propertyName)) {
        return;
      }
      allProperties.push(propertyName);

      var isFunction = angular.isFunction(property);
      it('should have the ' + propertyName + ' ' + (isFunction ? 'function' : 'property'), function(){
        expect(scope[propertyName]).toBeDefined();

        if(isFunction){
          var scopePropIsFn = angular.isFunction(scope[propertyName]),
            trueStatement = 'scope property is function';
          expect(trueStatement).toBe(scopePropIsFn ? trueStatement : false);
        }
      });
    });

    it('should not have any untested items', function(){
      angular.forEach(scope, function(property, propertyName){
        if(!scope.hasOwnProperty(propertyName) || propertyName[0] === '$' || propertyName === 'this') {
          return;
        }

        if(allProperties.indexOf(propertyName) < 0){
          expect('should not have the untested property "$scope.' + propertyName + '"').toBe(true);
        }
      });
    });
  });

  describe('Macro controller functionality', function(){
    it('should load the currently available macros on start up', function(){
      expect(scope.currentMacros).toEqual(savedMacros);
    });

    it('should record a macro and update the available macros', function(){
      var macro = { device: 'samsung2', commands: ['up', 'down', 'left', 'right']};

      scope.startRecording();

      angular.forEach(macro.commands, function(command){
        irService.sendCommand(macro.device, command);
        $httpBackend.flush();
      });

      scope.stopRecording();

      $httpBackend.flush();

      var expectedCurrentMacros = angular.copy(savedMacros);
      expectedCurrentMacros.push(macro);

      expect(scope.currentMacros).toEqual(expectedCurrentMacros);
    });
  });
});
