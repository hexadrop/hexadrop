import { QueryHandlerError } from './error';
import type { QueryClass } from './query';
import Query from './query';

/**
 * @constant
 * @description The metadata key used to define query handlers.
 */
const QUERY_HANDLER_METADATA_KEY = 'query-handler';

/**
 * Function that creates a QueryHandler decorator
 * @function
 * @template ResponseType - The type of the response
 * @param {...QueryClass<ResponseType, Query<ResponseType>>[]} queries - An array of Query classes
 * @returns {ClassDecorator} - A class decorator that assigns metadata to the target class
 * @throws {QueryHandlerError} - Throws an error if the target class does not implement a `run` method
 */
function QueryHandler<ResponseType>(...queries: QueryClass<ResponseType, Query<ResponseType>>[]): ClassDecorator {
	return <ClassType extends Function>(target: ClassType): ClassType => {
		if ('run' in target.prototype) {
			for (const query of queries) {
				Reflect.defineMetadata<ClassType>(QUERY_HANDLER_METADATA_KEY, target, query);
			}
		} else {
			throw new QueryHandlerError('QueryHandler must implements a `run()` method');
		}

		return target;
	};
}

export default QueryHandler;
