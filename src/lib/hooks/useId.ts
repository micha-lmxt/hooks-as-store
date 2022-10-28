import { useRef } from './useRef';
let number = 0;
export function useId() {
	const state = useRef('P' + number++ + '_' + new Date().getTime());

	return state.current;
}
