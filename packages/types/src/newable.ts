/**
 * Represents a newable class.
 * @typeParam T Class type.
 */
export type Newable<T> = new (...args: any[]) => T;
