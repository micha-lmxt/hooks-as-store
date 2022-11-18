import { useLayoutEffect } from './useLayoutEffect.js';

export function useImperativeHandle(
	ref: { current: any } | ((x: any) => { current: any }),
	createHandle: () => object,
	reqs: any[]
) {
	useLayoutEffect(
		() => {
			if (typeof ref == 'function') {
				ref(createHandle());
				return () => ref(null);
			} else if (ref) {
				ref.current = createHandle();
				return () => (ref.current = null);
			}
		},
		reqs == null ? reqs : reqs.concat(ref)
	);
}
