/**
 * Type definition for Methods.
 * @type { [P in keyof T]: T[P] extends Function ? P : never; }[keyof T] The type is a subset of T's keys where the corresponding value type is a function.
 * @template T The type of the object.
 */
type Methods<T> = {
	[P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

/**
 * Type definition for MethodsAndProperties.
 * @type { [Property in keyof T]: T[Property] } The type is a map of T's keys to their corresponding value types.
 * @template T The type of the object.
 */
type MethodsAndProperties<T> = { [Property in keyof T]: T[Property] };

/**
 * Type definition for Properties.
 * @type { Omit<MethodsAndProperties<T>, Methods<T>> } The type is a subset of T's keys where the corresponding value type is not a function.
 * @template T The type of the object.
 */
type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

/**
 * Type definition for PrimitiveTypes.
 * @type { Date | boolean | number | string | null | undefined } The type can be Date, boolean, number, string, null, or undefined.
 */
type PrimitiveTypes = Date | boolean | null | number | string | undefined;

/**
 * Type definition for ValueObjectValue.
 * @type { T extends PrimitiveTypes ? T : T extends { value: infer U } ? U : T extends { value: infer U }[] ? U[] : T extends (infer U)[] ? ValueObjectValue<U>[] : T extends { [K in keyof Properties<T>]: unknown } ? { [K in keyof Properties<T>]: ValueObjectValue<Properties<T>[K]> } : never } The type is a recursive type that unwraps the value types of T's properties.
 * @template T The type of the object.
 */
type ValueObjectValue<T> = T extends PrimitiveTypes
	? T
	: T extends { value: infer U }
		? U
		: T extends { value: infer U }[]
			? U[]
			: T extends (infer U)[]
				? ValueObjectValue<U>[]
				: T extends { [K in keyof Properties<T>]: unknown }
					? { [K in keyof Properties<T>]: ValueObjectValue<Properties<T>[K]> }
					: never;

/**
 * Type definition for Primitives.
 * @type { [Property in keyof Properties<T>]: ValueObjectValue<T[Property]>; } The type is a map of T's keys to their unwrapped value types.
 * @template T The type of the object.
 */
export type Primitives<T> = {
	[Property in keyof Properties<T>]: ValueObjectValue<T[Property]>;
};
