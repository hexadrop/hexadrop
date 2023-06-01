/**
 * Make all properties in T optional
 */
export type NestedNonNullable<T> = Required<{
	[P in keyof T]?: NonNullable<T[P]>;
}>;
