import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { getContext } from 'svelte';
import { readable, get, type Readable } from 'svelte/store';

export function useContext<T>(context: any) {
	const hook = getOrAddHook(() => {
		const ctx = getContext<T>(context);
		if (ctx !== undefined) return ctx;
		return (context && context.default?.subscribe) ? context.default : readable(undefined);
	}) as Readable<T>;
	return get(hook);
}
