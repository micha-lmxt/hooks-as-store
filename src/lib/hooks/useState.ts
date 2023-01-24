import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { get, writable, type Writable } from 'svelte/store';

function initialize<T>(start?: T, init?: (x?: T) => T) {
	return function () {
		const hook = writable(init ? init(start) : start) as UseState<T>;
		hook.setter = (f: T | ((prev: T) => T)) => {
			if (typeof f === 'function') {
				hook.update(f as (prev: T) => T);
			} else {
				hook.set(f);
			}
		};
		return hook;
	};
}
export type UseState<T> = Writable<T> & { setter: (t: T | ((prev: T) => T)) => void };

export function useState<T>(start: T | (() => T)): [T, (val: (T | ((prev: T) => T))) => void] {
	const s: T = typeof start === 'function' ? (start as () => T)() : start;

	const hook = getOrAddHook(initialize(s)) as UseState<T>;

	return [get(hook), hook.setter];
}
