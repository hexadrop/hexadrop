/**
 * `Service` is a function that acts as a Class Decorator.
 *
 * @returns {ClassDecorator} - A ClassDecorator is a type of decorator that is used to modify classes.
 *
 * @example
 *
 * @Service()
 * class MyClass { }
 *
 * This will apply the decorator to `MyClass`.
 */
export default function Service(): ClassDecorator {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		/*
		 * The decorator function logic goes here.
		 * In this case, it simply returns the target class without modifying it.
		 */
		return target;
	};
}
