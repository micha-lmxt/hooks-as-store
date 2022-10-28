import { getOrAddHook } from '$lib/entry/cacheArray';
import { get, writable, type Writable } from 'svelte/store';

export type UseReducer<T, S> = Writable<T> & { reducer: (action: S) => void };

export function initialize<T, S>(reducer: (t: T, a: S) => T, start?: T, init?: (x?: T) => T) {
	return function () {
		const hook = writable(init ? init(start) : start) as UseReducer<T, S>;
		hook.reducer = (action: S) => {
			hook.update((state) => reducer(state, action));
		};
		return hook;
	};
}
export function useReducer<T, S>(
	reducer: (state: T, action: S) => T,
	initialArg: T,
	init?: (x?: T) => T
) {
	const hook = getOrAddHook(initialize(reducer, initialArg, init)) as UseReducer<T, S>;
	return [get(hook), (action: S) => hook.update((state) => reducer(state, action))];
}
