/**
 * Represents an abstract class.
 * @typeParam T Class type.
 */
export interface Abstract<T> extends Function {
	prototype: T;
}
