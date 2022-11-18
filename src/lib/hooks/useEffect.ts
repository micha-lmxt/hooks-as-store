import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { tick, onDestroy, onMount } from 'svelte';
import { unequalArgs } from './utils.js';

export type UseEffect = { reqs: any[] | undefined; cleanup?: () => void; mounted: boolean };

function initialize() {
	return function () {
		const w: UseEffect = { reqs: undefined, cleanup: undefined, mounted: false };
		onMount(() => (w.mounted = true));
		onDestroy(() => {
			const cl = w.cleanup;
			if (cl) {
				cl();
			}
		});
		return w;
	};
}
export function useEffect(handler: () => void | (() => void), reqs?: any[]) {
	const hook = getOrAddHook(initialize()) as UseEffect;
	const r = hook.reqs;
	if (unequalArgs(r, reqs)) {
		tick().then(() => {
			if (hook.mounted) {
				hook.reqs = reqs;
				hook.cleanup = handler() || undefined;
			}
		});
	}
}
