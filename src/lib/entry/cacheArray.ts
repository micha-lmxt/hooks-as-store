import type { Hook } from '$lib/hooks';

export const cacheArray: { current: Hook[]; index: number } = { current: [], index: 0 };

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
