import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { beforeUpdate, onDestroy } from 'svelte';
import type { UseLayoutEffect } from './useLayoutEffect.js';
import { unequalArgs } from './utils.js';


function initialize() {
	return function () {
		const w: UseLayoutEffect = { reqs: undefined, cleanup: undefined, handler: undefined };
		beforeUpdate(() => {
			if (w.handler) {
				if (w.cleanup) {
					w.cleanup();
				}
				w.cleanup = w.handler();
			}
		});
		onDestroy(() => {
			const cl = w.cleanup;
			if (cl) {
				cl();
			}
		});
		return w;
	};
}
export function useBeforeUpdate(handler: () => void | undefined | (() => void), reqs?: any[]) {
	const hook = getOrAddHook(initialize()) as UseLayoutEffect;
	const r = hook.reqs;
	if (unequalArgs(r, reqs)) {
		hook.handler = handler;
		hook.reqs = reqs;
	}
}
