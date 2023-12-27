/**
 * Represents a newable class.
 * @typeParam T Class type.
 */
export interface Newable<T> extends Function {
	new (...args: any[]): T;
}
