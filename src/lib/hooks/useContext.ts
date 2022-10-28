import { getOrAddHook } from '$lib/entry/cacheArray';
import { getContext } from 'svelte';

export function useContext<T>(context: any) {
	return getOrAddHook(() => {
		const ctx = getContext<T>(context);
		if (ctx !== undefined) return ctx;
		return context.default;
	});
}
