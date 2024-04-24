/**
 * Represents a newable class.
 * @typeParam T Class type.
 */
export type Newable<T> = new (...arguments_: any[]) => T;
