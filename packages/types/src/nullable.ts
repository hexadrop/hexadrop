/**
 * Type definition for Nullable.
 * @type {T | null | undefined} The type can be T, null, or undefined.
 * @template T The type of the value that can be null or undefined.
 */
type Nullable<T> = null | T | undefined;

/**
 * Type definition for PartialNullable.
 * @type { [P in keyof T]?: Nullable<T[P]>; } Make all properties in T optional and can be null or undefined.
 * @template T The type of the object.
 */
type PartialNullable<T> = {
	[P in keyof T]?: Nullable<T[P]>;
};

export type { Nullable, PartialNullable };
