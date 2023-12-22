export type Class<CtorArgs extends any[] = any[], InstanceType = unknown, StaticType = unknown> = (new (
	..._args: CtorArgs
) => InstanceType) &
	StaticType;
