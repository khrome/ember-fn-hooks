function mutate(classDefinition, hooks, monitor){
    var originalFns = {};
    var mod = {};
    Object.keys(hooks).forEach(function(hookName){
      if(!classDefinition.prototype[hookName]){
        mod[hookName] = function(){
          hooks[hookName].apply(this, arguments);
          if(monitor){
            if(!monitor[hookName]) monitor[hookName] = 1;
            else monitor[hookName]++;
          }
        };
      }else{
        originalFns[hookName] = classDefinition.prototype[hookName];
        mod[hookName] = function(){
          originalFns[hookName].apply(this, arguments);
          hooks[hookName].apply(this, arguments);
          if(monitor){
            if(!monitor[hookName]) monitor[hookName] = 1;
            else monitor[hookName]++;
          }
        };
      }
    });
    if(classDefinition.reopen){
        //ember class
        classDefinition.reopen(mod);
    }else{
        //js class prototype
        Object.keys(mod).forEach(function(key){
            classDefinition.prototype[key] = mod[key];
        });
    }
}

module.exports = {
    mutate : mutate
}
