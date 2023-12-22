type Nullable<T> = T | null | undefined;

/**
 * Make all properties in T optional
 */
type PartialNullable<T> = {
	[P in keyof T]?: Nullable<T[P]>;
};

export type { Nullable, PartialNullable };
