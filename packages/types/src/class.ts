/* eslint-disable @typescript-eslint/no-explicit-any */
export type Class<CtorArgs extends any[] = any[], InstanceType = unknown, StaticType = unknown> = (new (
	...args: CtorArgs
) => InstanceType) &
	StaticType;

export {}
