export function useDebugValue<T>(value: T, cb?: (value: T) => string | number): void {
    console.log(cb?cb(value):value);
}
