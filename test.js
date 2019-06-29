var should = require("chai").should();
var hooks = require("./hooks.js");

describe('stream-responder-heirarchy', function(){

    it('works for a prototype object', function(complete){
        var counts = {fn:0, shim:0};
        var monitor = {};
        var Test = function(){};
        Test.prototype.fn = function(){
            counts.fn++;
        }
        hooks.mutate(Test, {
            fn:function(){
                counts.shim++;
            }
        }, monitor);
        var instance = new Test();
        instance.fn();
        instance.fn();
        counts.fn.should.equal(2);
        counts.shim.should.equal(2);
        monitor.fn.should.equal(2);
        complete();
    });

    it('works for an ember-like object', function(complete){
        var counts = {fn:0, shim:0, reopen:0};
        var monitor = {};
        var Test = function(){};
        Test.prototype.fn = function(){
            counts.fn++;
        }
        Test.reopen = function(mod){
            //not what ember does, but who cares, in the scope of this test?
            Object.keys(mod).forEach(function(key){
                Test.prototype[key] = mod[key];
            });
            counts.reopen++;
        }
        hooks.mutate(Test, {
            fn:function(){
                counts.shim++;
            }
        }, monitor);
        var instance = new Test();
        instance.fn();
        instance.fn();
        counts.fn.should.equal(2);
        counts.shim.should.equal(2);
        counts.reopen.should.equal(1);
        monitor.fn.should.equal(2);
        complete();
    });
});
