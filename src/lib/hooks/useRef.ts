import { getOrAddHook } from '$lib/entry/cacheArray';

export type UseRef<T> = { current: T };

const initialize = <T>(val: T) => {
	return () => ({ current: val });
};

export function useRef<T>(val: T) {
	return getOrAddHook(initialize(val)) as UseRef<T>;
}
