type Methods<T> = {
	[P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [Property in keyof T]: T[Property] };

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type PrimitiveTypes = Date | boolean | number | string | null | undefined;

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

export type Primitives<T> = {
	[Property in keyof Properties<T>]: ValueObjectValue<T[Property]>;
};
