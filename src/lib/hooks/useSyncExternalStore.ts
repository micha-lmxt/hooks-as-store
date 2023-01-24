import { getOrAddHook } from '$lib/entry/cacheArray.js';
import { writable, type Writable, get } from 'svelte/store';

type Unsubscriber = () => void
export type UseSyncExternalStore<T> = Writable<{ subscribe: (cb: (value: T) => void) => Unsubscriber, unsubscribe?: Unsubscriber, value: T }>;

function initialize<T>(
    subscribe: (cb: (value: T) => void) => Unsubscriber,
    getSnapshot: () => T,
    getServerSnapshot?: () => T) {
    return function () {

        const hook = writable({ subscribe, value: (getServerSnapshot ? getServerSnapshot : getSnapshot)() }) as UseSyncExternalStore<T>;
        let initial = true;
        hook.update(a => {
            a.unsubscribe = subscribe(() => {
                hook.update(w => {
                    w.value = ((initial && getServerSnapshot) ? getServerSnapshot : getSnapshot)();
                    return { ...w };
                })
            })
            return a;
        })
        initial = false;
        return hook;
    }
}
export function useSyncExternalStore<T>(
    subscribe: (cb: (value: T) => void) => Unsubscriber,
    getSnapshot: () => T,
    getServerSnapshot?: () => T) {
    const hook = getOrAddHook(initialize(subscribe, getSnapshot, getServerSnapshot)) as UseSyncExternalStore<T>;
    const hookContent = get(hook);
    if (hookContent.subscribe !== subscribe) {
        hookContent.unsubscribe?.();
        hook.update(a => {
            a.subscribe = subscribe;
            a.unsubscribe = subscribe(() => {
                hook.update(w => {
                    w.value = getSnapshot();
                    return { ...w };
                })
            })
            return a;
        })
        return getSnapshot();
    }
    return hookContent.value;
}