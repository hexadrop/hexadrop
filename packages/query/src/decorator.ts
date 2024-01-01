import { QueryHandlerError } from './error';
import type { QueryClass } from './query';
import Query from './query';

/**
 * @constant
 * @description The metadata key used to define query handlers.
 */
const QUERY_HANDLER_METADATA_KEY = 'query-handler';

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
