import type { Container } from '@hexadrop/ioc';

import type { QueryBusCallback, QueryHandler, QueryHandlerClass } from './bus';
import { QUERY_HANDLER_METADATA_KEY } from './decorator';
import { InvalidQueryError, QueryNotRegisteredError } from './error';
import type { QueryClass } from './query';
import Query from './query';
import QueryHandlers from './query-handlers';

/**
 * This is a class named IoCQueryHandlers that extends the abstract class QueryHandlers.
 * It provides an implementation for handling queries using an IoC (Inversion of Control) container.
 */
export default class IoCQueryHandlers extends QueryHandlers {
	/**
	 * This is the constructor method for the class.
	 * It takes a container of type 'Container' as an argument.
	 * The container is used to get instances of query handlers.
	 *
	 * @param {Container} container - The IoC container.
	 */
	constructor(private readonly container: Container) {
		super();
	}

	/**
	 * This is a public method named 'search'.
	 * It takes a query of type 'QueryType' or 'QueryClass<ResponseType, QueryType>' as an argument.
	 * 'ResponseType' and 'QueryType' are generic parameters where 'QueryType' extends 'Query<ResponseType>'.
	 * The method searches for a query handler registered with the query name using the IoC container.
	 * If the query does not have a name, it throws an 'InvalidQueryError'.
	 * If the query handler is not registered, it throws a 'QueryNotRegisteredError'.
	 * The method returns a 'QueryBusCallback<ResponseType, QueryType>'.
	 *
	 * @param {QueryType | QueryClass<ResponseType, QueryType>} query - The query to be searched.
	 * @returns {QueryBusCallback<ResponseType, QueryType>} - The query handler callback.
	 * @template ResponseType - The type of the response.
	 * @template QueryType - The type of the Query that extends Query<ResponseType>.
	 */
	public search<ResponseType, QueryType extends Query<ResponseType>>(
		query: QueryClass<ResponseType, QueryType> | QueryType
	): QueryBusCallback<ResponseType, QueryType> {
		let handler: QueryHandlerClass<ResponseType, QueryType> | undefined;
		let queryName: string | undefined;

		// Check if the query has a QUERY_NAME property
		if ('QUERY_NAME' in query) {
			queryName = query.QUERY_NAME;
			handler = Reflect.getMetadata<QueryHandlerClass<ResponseType, QueryType>>(
				QUERY_HANDLER_METADATA_KEY,
				query
			);
		} else if ('queryName' in query) {
			// Check if the query has a queryName property
			queryName = query.queryName;
			handler = Reflect.getMetadata<QueryHandlerClass<ResponseType, QueryType>>(
				QUERY_HANDLER_METADATA_KEY,
				query.constructor
			);
		}

		// If the query does not have a name, throw an error
		if (!queryName) {
			throw new InvalidQueryError();
		}

		// If the query handler is not registered, throw an error
		if (!handler) {
			throw new QueryNotRegisteredError(queryName);
		}

		// Get the query handler instance from the IoC container
		const instance = this.container.get<QueryHandler<ResponseType, QueryType>>(handler);

		// Return the query handler callback
		return instance.run.bind(instance);
	}
}
