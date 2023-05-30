import type { Nullable } from './nullable';

/**
 * Make all properties in T optional
 */
export type PartialNullable<T> = {
	[P in keyof T]?: Nullable<T[P]>;
};
