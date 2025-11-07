import type { QueryBusCallback, QueryHandler } from './bus';
import { InvalidQueryError, QueryNotRegisteredError } from './error';
import type { QueryClass } from './query';
import Query from './query';
import QueryHandlers from './query-handlers';
/**
 * InMemoryQueryHandlers is a class that extends QueryHandlers.
 * It is used to handle queries in memory.
 *
 * @property {Map<string, QueryBusCallback>} queryHandlersMap - A map that stores the query handlers.
 */
export default class InMemoryQueryHandlers extends QueryHandlers {
	private readonly queryHandlersMap: Map<string, QueryBusCallback>;

	/**
	 * Constructs a new instance of the InMemoryQueryHandlers class.
	 */
	constructor() {
		super();
		this.queryHandlersMap = new Map<string, QueryBusCallback>();
	}

	/**
	 * @static
	 * @method merge
	 * @description Merges multiple InMemoryQueryHandlers instances into one.
	 * @param {...InMemoryCommandHandlers[]} handlers - The instances to merge.
	 * @returns {InMemoryCommandHandlers} The merged InMemoryQueryHandlers instance.
	 */
	static merge(...handlers: InMemoryQueryHandlers[]): InMemoryQueryHandlers {
		const merged = new InMemoryQueryHandlers();

		for (const handler of handlers) {
			for (const [queryName, callback] of handler.queryHandlersMap.entries()) {
				merged.queryHandlersMap.set(queryName, callback);
			}
		}

		return merged;
	}

	/**
	 * This method is used to register a query handler.
	 * It stores the handler in the queryHandlersMap with the query's QUERY_NAME as the key.
	 *
	 * @param {QueryClass<ResponseType, QueryType>} query - The QueryClass to be registered.
	 * @param {QueryBusCallback<ResponseType, QueryType> | QueryHandler<ResponseType, QueryType>} handlerOrCallback - The handler or callback to be registered.
	 * @template ResponseType - The type of the response that the query handler should return.
	 * @template QueryType - The type of the Query that extends Query<ResponseType>.
	 */
	public register<ResponseType, QueryType extends Query<ResponseType>>(
		query: QueryClass<ResponseType, QueryType>,
		handlerOrCallback: QueryBusCallback<ResponseType, QueryType> | QueryHandler<ResponseType, QueryType>
	): void {
		if ('run' in handlerOrCallback) {
			this.queryHandlersMap.set(
				query.QUERY_NAME,
				handlerOrCallback.run.bind(handlerOrCallback) as QueryBusCallback
			);
		} else {
			this.queryHandlersMap.set(query.QUERY_NAME, handlerOrCallback as QueryBusCallback);
		}
	}

	/**
	 * This method is used to search for a query handler.
	 * It retrieves the handler from the queryHandlersMap using the query's QUERY_NAME or queryName as the key.
	 * If no handler is found, it throws a QueryNotRegisteredError.
	 *
	 * @param {QueryType | QueryClass<ResponseType, QueryType>} query - The Query or QueryClass to be searched for.
	 * @returns {QueryBusCallback<ResponseType, QueryType>} - The found query handler.
	 * @throws {InvalidQueryError} - If the query does not have a QUERY_NAME or queryName.
	 * @throws {QueryNotRegisteredError} - If no handler is found for the query.
	 * @template ResponseType - The type of the response that the query handler should return.
	 * @template QueryType - The type of the Query that extends Query<ResponseType>.
	 */
	public search<ResponseType, QueryType extends Query<ResponseType>>(
		query: QueryClass<ResponseType, QueryType> | QueryType
	): QueryBusCallback<ResponseType, QueryType> {
		let queryName: string | undefined;
		if ('QUERY_NAME' in query) {
			queryName = query.QUERY_NAME;
		} else if ('queryName' in query) {
			queryName = query.queryName;
		}
		if (!queryName) {
			throw new InvalidQueryError();
		}
		const handler = this.queryHandlersMap.get(queryName) as QueryBusCallback<ResponseType, QueryType> | undefined;
		if (!handler) {
			throw new QueryNotRegisteredError(queryName);
		}

		return handler;
	}

	/**
	 * This method is used to unregister a query handler.
	 * It removes the handler from the queryHandlersMap using the query's QUERY_NAME as the key.
	 *
	 * @param {QueryClass<unknown, Query<unknown>>} query - The QueryClass to be unregistered.
	 */
	public unregister(query: QueryClass<unknown, Query<unknown>>): void {
		this.queryHandlersMap.delete(query.QUERY_NAME);
	}
}
