import type { QueryBusCallback } from './bus';
import type { QueryClass } from './query';
import Query from './query';
/**
 * This is an abstract class named QueryHandlers.
 * It provides a structure for handling queries in the application.
 *
 * @abstract
 */
export default abstract class QueryHandlers {
	/**
	 * This is an abstract method named 'search'.
	 * It is expected to be implemented by subclasses of QueryHandlers.
	 * The method takes a query of type 'QueryType' or 'QueryClass<ResponseType, QueryType>' as an argument.
	 * 'ResponseType' and 'QueryType' are generic parameters where 'QueryType' extends 'Query<ResponseType>'.
	 * The method should return a 'QueryBusCallback<ResponseType, QueryType>'.
	 *
	 * @abstract
	 * @param {QueryType | QueryClass<ResponseType, QueryType>} query - The query to be searched.
	 * @returns {QueryBusCallback<ResponseType, QueryType>} - The callback function to be executed when the query is found.
	 * @template QueryType - The type of the query to be searched.
	 * @template ResponseType - The type of the response to be returned.
	 */
	public abstract search<ResponseType, QueryType extends Query<ResponseType>>(
		query: QueryType | QueryClass<ResponseType, QueryType>
	): QueryBusCallback<ResponseType, QueryType>;
}
