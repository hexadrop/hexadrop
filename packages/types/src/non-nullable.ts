/**
 * Make all properties in T optional
 */
export type NestedNonNullable<T> = {
	[P in keyof T]?: NonNullable<T[P]>;
};
