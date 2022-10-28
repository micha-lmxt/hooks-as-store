export const unequalArgs = (oldArgs?: any[], newArgs?: any[]) => {
	return (
		oldArgs === undefined ||
		newArgs === undefined ||
		oldArgs.length !== newArgs.length ||
		oldArgs.some((v, i) => v !== newArgs?.[i])
	);
};
