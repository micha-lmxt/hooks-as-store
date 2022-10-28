import { getOrAddHook } from '$lib/entry/cacheArray';
import { afterUpdate, onDestroy } from 'svelte';
import { unequalArgs } from './utils';

export type UseLayoutEffect = { reqs?: any[]; cleanup?: () => void; handler?: () => any };

function initialize() {
	return function () {
		const w: UseLayoutEffect = { reqs: undefined, cleanup: undefined, handler: undefined };
		afterUpdate(() => {
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
export function useLayoutEffect(handler: () => undefined | (() => void), reqs?: any[]) {
	const hook = getOrAddHook(initialize()) as UseLayoutEffect;
	const r = hook.reqs;
	if (unequalArgs(r, reqs)) {
		hook.handler = handler;
		hook.reqs = reqs;
	}
}
