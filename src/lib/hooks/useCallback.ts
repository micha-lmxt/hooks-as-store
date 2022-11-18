import { useMemo } from './useMemo.js';

export function useCallback<T extends (...ags: any[]) => any>(fun: T, reqs?: any[]): T {
	return useMemo(() => fun, reqs);
}
