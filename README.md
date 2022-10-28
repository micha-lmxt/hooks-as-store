# hooks-as-store

Use React custom hooks in Svelte Apps.

[hooks-as-store page](https://hooks-as-store.gradientdescent.de)

## Installation

```bash
npm install --save-dev hooks-as-store
```

## Usage

Let's say you have some custom hook code in 'myhook.js', which calles built-in hooks or other custom hooks:

```javascript
import {useState, useEffect} from 'hooks-as-store';

export const myHook = (someprop,otherprop)=>{

    const [value,setValue] = useState(someprop);

    useEffect(()=>{
       ...
    },[otherprop]);

    return {value, setValue}
}
```

In svelte script part you can load this hook like this:

```javascript
import { hook } from 'hooks-as-store';
import { myHook } from './myhook';

const hookStore = hook(myHook, 'someprop', 'abc');
```

First argument to the `hook` function is the custom hook you want to execute. You can pass props to the hook
in the following arguments. Call the hook function in a non-reactive script part of a component (do not use $:).
Never call the `hook` function inside a custom hook.
`hookStore` is a readable store. If you want to access its values, you can unload it like this:

```javascript
$: ({ value, setValue } = $hookStore);
```

Notice the autosubscription (`$hookstore`) and the brackets around the whole statement.

The hook is automatically re-run, when a state inside is changed, e.g. when `setValue` is used.

You can re-execute the hook code with the `run` propery, eg. `myHook.run(props)`.
It does not automatically re-run, whenever the component is updated. If you want this behavior (like it is in React),
you need to implement it yourself, eg.:

```javascript
import {beforeUpdate} from 'svelte';
...
beforeUpdate(()=>{
    myHook.run("someprop", "abc")
})
```

If that is really necessary depends on your use-case. Often it may be enough to re-execute it when the
props change:

```javascript
let prop1 = 'someprop',
	prop2 = 'abc';
$: myHook.run(prop1, prop2);
```

## Dependend hooks

If you have more than one custom hooks, which depend on each other, it might be useful to group them. The
function `hookGroup` accepts an array of arrays. In the inner array, the first element should be the hook,
the rest is filled with the props for this hook. Eg:

```javascript
import { hoogGroup } from 'hooks-as-store';
import { hook1, hook2, hook3 } from './myhooks.';

const hookResults = hookGroup([
	[hook1, hook1prop1, hook1prop2], //hook1 takes 2 props
	[hook2], //hook2 doesn't take props
	[hook3, hook3props]
]);
// unwrap hookResults
$: [
	{ hook1returnvalue },
	undefined /*hook2 does not return anything*/,
	{ hook3returnvalue1, hook3returnvalue2 }
] = $hookResults;

// re-execute all hooks if any prop changes
$: hookResults.run([hook1prop1, hook1prop2], [], [hook3props]);
```

Once a state changes in any of the three hooks, all hooks are re-executed in the same order.

## Extenal hooks

You can redirect the imports from 'react' to 'hooks-as-store' like this in 'vite.config.js':

```javascript
...
const config: UserConfig = {
	...
	resolve:{
		alias:{
			react:'hooks-as-store'
		}
	},
    ...
}
...
```

For aliases on other bundlers I found this page helpful: [Switching to Preact](https://preactjs.com/guide/v8/switching-to-preact/)

If React errors occur (Invalid hook call. Hooks can only be called inside of the body of a function component. etc.), try deleting the 'react' folder in 'node_modules'.
Another option, which seems to be more persistent, is to go into node_modules/react/package.json and change 'main':

```json
{
	"main": "../hooks-as-store/index.js"
}
```

To also change the imports in external libraries, it might be necessary to mark these libraries as noExternal in 'vite.config.js':

```javascript
...
{
    ...
    ssr:{
		noExternal:["use-media","@wellyshen/use-web-animations"]
	}
}
...
```

## Notes

Most of the built-in react hooks are implemented in this package, but not all are tested very well.

### Context

The useContext hook makes use of Svelte contexts. If you can set the context with 'setContext' from 'svelte',
it works. Some libraries offers custom provider components, eg. [use-cart](https://github.com/sammdec/use-cart).
This case is not yet usable with this library.

## Contribution

Contributions are welcome. Some topics of interest:

- good examples for uncommon hooks (eg. useId, useDeferredValue, useImperativeHandle etc.)
- better/easier 'alias' strategy for imported react hooks / better vite configuration
- Context strategy

The scope of this library is to enable the use of custom react hooks. It can be referenced as part of a general
react interop library, but it is not planned to become one itself.

To expand this idea, you could say that a React functional component is a custom hook, which returns a part of a virtual dom tree.
You could (easily?) implement a `createElement` function, obtain the tree from this library and create a generic
svelte virtual dom tree renderer component. Something like this is not in the scope of this library, but let me
know if you try it!
