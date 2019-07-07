var fnHooks ={};
var monitor;
fnHooks.mutate = function(classDefinition, hooks){
    var originalFns = {};
    var mod = {};
    Object.keys(hooks).forEach(function(hookName){
        var proto = classDefinition.prototype;
        originalFns[hookName] = proto[hookName];
        mod[hookName] = function(){
            var res;
            if(!this._super){
                if(originalFns[hookName]){
                    res = originalFns[hookName].apply(this, arguments);
                    hooks[hookName].apply(this, arguments);
                }else{
                    res = hooks[hookName].apply(this, arguments);
                }
            }else{
                this._super.apply(this, arguments);
                res = hooks[hookName].apply(this, arguments);
            }
            if(monitor){
                if(!monitor[hookName]) monitor[hookName] = 1;
                else monitor[hookName]++;
            }
            return res;
        };
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
