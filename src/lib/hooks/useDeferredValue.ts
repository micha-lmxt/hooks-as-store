import { useEffect } from './useEffect.js';
import { useState } from './useState.js';

export function useDeferredValue<T>(value: T) {
	const [val, setVal] = useState(value);
	useEffect(() => {
		setVal(value);
	}, [value]);
	return val;
}
