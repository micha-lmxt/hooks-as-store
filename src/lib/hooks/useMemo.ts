import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { unequalArgs } from './utils.js';

export type UseMemo<T> = { reqs?: any[]; val: T };

const initialize = <T>(fn: () => T, reqs?: any[]) => {
	return () => ({
		reqs: reqs,
		val: fn()
	});
};

export function useMemo<T>(fn: () => T, reqs?: any[]) {
	const hook = getOrAddHook(initialize(fn, reqs)) as UseMemo<T>;
	if (unequalArgs(reqs, hook.reqs)) {
		hook.val = fn();
		hook.reqs = reqs;
	}
	return hook.val;
}
