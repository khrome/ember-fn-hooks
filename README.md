ember-fn-hooks
==============

Now that I'm working on some ember plugins, I'm finding I need deeper hooks than the ones I'm provided. It's simple enough to use function overriding and then trigger the parent logic manually, but produces a ton of boilerplate I'd prefer not to maintain. So I wrapped it up in this:

```js
    const fnHooks = require('ember-fn-hooks');
    fnHooks.mutate(Route, {
        renderTemplate:function(){

        }
    });
```

Simple enough.
