export type Class<CtorArgs extends any[] = any[], InstanceType = unknown, StaticType = unknown> = (new (
	...args: CtorArgs
) => InstanceType) &
	StaticType;

export {}
