import { useMemo } from './useMemo';

export function useCallback<T extends (...ags: any[]) => any>(fun: T, reqs?: any[]): T {
	return useMemo(() => fun, reqs);
}
