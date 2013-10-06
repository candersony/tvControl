'use strict';

function describeInterface(name, interfaceDefinition, getImplementationInstance){

  function getType(property){
    var types = ['Array', 'Date', 'Element', 'Function', 'Number', 'Object', 'String'];

    for(var i in types){
      var type = types[i];
      if(angular['is' + type](property)){
        return type;
      }
      if(typeof property === 'boolean'){
        return 'Boolean';
      }
    }

    return null;
  }

  describe(name + ' interface', function(){
    var allProperties = [];

    angular.forEach(interfaceDefinition, function(property, propertyName){
      if(!interfaceDefinition.hasOwnProperty(propertyName)) {
        return;
      }
      allProperties.push(propertyName);

      var type = getType(property);
      it('should have the property "' + propertyName + '" of type ' + type, function(){
        var implementationInstance = getImplementationInstance(),
            propertyIsIncorrect = false;

        if(type === 'Boolean'){
          propertyIsIncorrect = typeof implementationInstance[propertyName] !== 'boolean';
        }
        else{
          propertyIsIncorrect = !angular['is' + type](implementationInstance[propertyName]);
        }

        if(propertyIsIncorrect){
          expect(name + '.' + propertyName).toBe(type);
        }
      });
    });

    it('should not have any untested items', function(){
      var implementationInstance = getImplementationInstance();
      angular.forEach(implementationInstance, function(property, propertyName){
        if(!implementationInstance.hasOwnProperty(propertyName) || propertyName[0] === '$' || propertyName === 'this') {
          return;
        }

        if(allProperties.indexOf(propertyName) < 0){
          var type = getType(property);
          expect('' + name + '.' + propertyName + ' of type: ' + type).toBe('tested');
        }
      });
    });
  });
}
