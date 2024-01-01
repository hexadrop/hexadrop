import type { QueryBusCallback, QueryHandler } from './bus';
import { InvalidQueryError, QueryNotRegisteredError } from './error';
import type { QueryClass } from './query';
import Query from './query';
import QueryHandlers from './query-handlers';
/**
 * This is a class named InMemoryQueryHandlers that extends the abstract class QueryHandlers.
 * It provides an in-memory implementation for handling queries in the application.
 */
export default class InMemoryQueryHandlers extends QueryHandlers {
	/**
	 * A private readonly property named 'queryHandlersMap'.
	 * It is a Map where the keys are strings (query names) and the values are QueryBusCallback functions.
	 */
	private readonly queryHandlersMap: Map<string, QueryBusCallback>;

	/**
	 * This is the constructor method for the class.
	 * It initializes the 'queryHandlersMap' property as a new Map.
	 */
	constructor() {
		super();
		this.queryHandlersMap = new Map<string, QueryBusCallback>();
	}

	/**
	 * This is a public method named 'register'.
	 * It takes a query and a handler or callback as arguments.
	 * The method registers the handler or callback to the 'queryHandlersMap' with the query name as the key.
	 *
	 * @param {QueryClass<ResponseType, QueryType>} query - The query to be registered.
	 * @param {QueryBusCallback<ResponseType, QueryType> | QueryHandler<ResponseType, QueryType>} handlerOrCallback - The handler or callback to be registered.
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
	 * This is a public method named 'search'.
	 * It takes a query as an argument.
	 * The method searches the 'queryHandlersMap' for the handler or callback registered with the query name.
	 * If the query name is not found, it throws an 'InvalidQueryError'.
	 * If the handler or callback is not found, it throws a 'QueryNotRegisteredError'.
	 *
	 * @param {QueryType | QueryClass<ResponseType, QueryType>} query - The query to be searched.
	 * @returns {QueryBusCallback<ResponseType, QueryType>} - The handler or callback registered with the query name.
	 */
	public search<ResponseType, QueryType extends Query<ResponseType>>(
		query: QueryType | QueryClass<ResponseType, QueryType>
	): QueryBusCallback<ResponseType, QueryType> {
		let handler: QueryBusCallback<ResponseType, QueryType> | undefined = undefined;
		let queryName: string | undefined = undefined;
		if ('QUERY_NAME' in query) {
			queryName = query.QUERY_NAME;
		} else if ('queryName' in query) {
			queryName = query.queryName;
		}
		if (!queryName) {
			throw new InvalidQueryError();
		}
		handler = this.queryHandlersMap.get(queryName) as QueryBusCallback<ResponseType, QueryType> | undefined;
		if (!handler) {
			throw new QueryNotRegisteredError(queryName);
		}

		return handler;
	}

	/**
	 * This is a public method named 'unregister'.
	 * It takes a query as an argument.
	 * The method removes the handler or callback registered with the query name from the 'queryHandlersMap'.
	 *
	 * @param {QueryClass<unknown, Query>} query - The query to be unregistered.
	 */
	public unregister(query: QueryClass<unknown, Query>): void {
		this.queryHandlersMap.delete(query.QUERY_NAME);
	}
}
