import { writable, type Readable } from 'svelte/store';
import { cacheArray } from './cacheArray';

interface CustomHook<T extends any[], S> extends Readable<S> {
	run: (...args: T) => void;
}

export function hook<T extends any[], S>(
	hookfunction: (...args: T) => S,
	...args: T
): CustomHook<T, S> {
	let lastvalues = args;

	cacheArray.current = [];
	cacheArray.index = 0;
	const result = hookfunction(...args);
	const hooks = [...cacheArray.current];
	const store = writable(result);

	const run = (...args: T) => {
		cacheArray.current = [...hooks];
		cacheArray.index = 0;
		lastvalues = args;
		const result = hookfunction(...args);
		store.set(result);
	};
	let i = true;
	hooks.forEach((v) => {
		if ('subscribe' in v)
			v.subscribe(() => {
				if (!i) run(...lastvalues);
			});
	});
	i = false;
	return {
		subscribe: store.subscribe,
		run
	};
}

export function hookGroup(hooks: any[]) {
	return hook(
		(props: any[]) => hooks.map((h, i) => h[0](...props[i])),
		hooks.map((h) => h.slice(1))
	);
}
