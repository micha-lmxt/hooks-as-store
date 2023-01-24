import type { Hook } from '$lib/hooks/index.js';
import { DEV, BROWSER } from 'esm-env';

let cacheArray: { current: Hook[]; index: number, flushsync: boolean };
if (DEV && BROWSER) {
	// vite dev mode may bundle this library (when non-esm code is loaded, I guess)
	// store the singleton in a global environment then.
	if (!window.___cacheArray_hooks_as_store) {
		window.___cacheArray_hooks_as_store = { current: [], index: 0, flushsync: false };
	}
	cacheArray = window.___cacheArray_hooks_as_store;
} else {
	cacheArray = { current: [], index: 0, flushsync: false }
}
export { cacheArray }//:  = { current: [], index: 0 };

export const getOrAddHook = (initializer: () => Hook) => {
	const hook = cacheArray.current[cacheArray.index];
	if (!hook) {
		const newhook = initializer();
		cacheArray.current[cacheArray.index] = newhook;
		cacheArray.index++;
		return newhook;
	}
	cacheArray.index++;
	return hook;
};

export const flushSync = (func:()=>void)=>{
	cacheArray.flushsync = true;
	func();
	cacheArray.flushsync = false;
}