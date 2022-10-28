import { useEffect } from './useEffect';
import { useState } from './useState';

export function useDeferredValue<T>(value: T) {
	const [val, setVal] = useState(value);
	useEffect(() => {
		setVal(value);
	}, [value]);
	return val;
}
