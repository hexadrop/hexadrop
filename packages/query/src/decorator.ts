import { QueryHandlerError } from './error';
import type { QueryClass } from './query';

/**
 * @constant
 * @description The metadata key used to define query handlers.
 */
const QUERY_HANDLER_METADATA_KEY = 'query-handler';

/**
 * QueryHandler is a function that acts as a class decorator. It is used to define query handlers.
 * It checks if the target class has a 'run' method in its prototype. If it does, it defines metadata for each query in the queries array.
 * If the 'run' method is not found in the target's prototype, it throws a QueryHandlerError.
 *
 * @param {...QueryClass<ResponseType>[]} queries - An array of QueryClass instances.
 * @returns {ClassDecorator} - Returns a class decorator that can be used to decorate a class.
 * @throws {QueryHandlerError} - Throws an error if the target class does not implement a 'run' method.
 * @template ResponseType - The type of the response that the queries handle.
 */
function QueryHandler<ResponseType>(...queries: QueryClass<ResponseType>[]): ClassDecorator {
	return <ClassType extends Function>(target: ClassType): ClassType => {
		// Check if the target class has a 'run' method in its prototype.
		if ('run' in target.prototype) {
			// If it does, define metadata for each query in the queries array.
			for (const query of queries) {
				Reflect.defineMetadata<ClassType>(QUERY_HANDLER_METADATA_KEY, target, query);
			}
		} else {
			// If the 'run' method is not found in the target's prototype, throw a QueryHandlerError.
			throw new QueryHandlerError('QueryHandler must implements a `run()` method');
		}

		// Return the target class.
		return target;
	};
}

export { QUERY_HANDLER_METADATA_KEY };

export default QueryHandler;
