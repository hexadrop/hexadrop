/**
 * Type definition for a Class.
 * @param {..._args: CtorArgs} _args The constructor arguments.
 * @returns {InstanceType} The instance type.
 * @static {StaticType} The static type.
 * @template CtorArgs The type of the constructor arguments, defaults to any array.
 * @template InstanceType The type of the instance, defaults to unknown.
 * @template StaticType The type of the static, defaults to unknown.
 */
export type Class<CtorArguments extends any[] = any[], InstanceType = unknown, StaticType = unknown> = StaticType &
	(new (..._arguments: CtorArguments) => InstanceType);
