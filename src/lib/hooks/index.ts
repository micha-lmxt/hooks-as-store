import type { UseEffect } from './useEffect.js';
import type { UseLayoutEffect } from './useLayoutEffect.js';
import type { UseMemo } from './useMemo.js';
import type { UseReducer } from './useReducer.js';
import type { UseRef } from './useRef.js';
import type { UseState } from './useState.js';
import type { UseSyncExternalStore } from './useSyncExternalStore.js';

export type Hook =
	| UseState<any>
	| UseEffect
	| UseMemo<any>
	| UseRef<any>
	| UseLayoutEffect
	| UseReducer<any, any> 
	| UseSyncExternalStore<any>; //| UseContext | UseReducer | UseCallback
