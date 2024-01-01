import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type Query from './query';

/**
 * Type alias for a QueryBusCallback
 * @typedef {(query: QueryType) => Either<DomainError, Response> | Promise<Either<DomainError, Response>>} QueryBusCallback
 * @template Response - The type of the response, defaults to unknown
 * @template QueryType - The type of the Query that extends Query<Response>, defaults to Query<Response>
 * @param {QueryType} query - The Query to be handled
 * @returns {Either<DomainError, Response> | Promise<Either<DomainError, Response>>} - Either a DomainError or the response type, or a Promise of either
 */
type QueryBusCallback<Response = unknown, QueryType extends Query<Response> = Query<Response>> = (
	query: QueryType
) => Either<DomainError, Response> | Promise<Either<DomainError, Response>>;

/**
 * Interface representing a QueryHandler
 * @interface
 * @template Response - The type of the response
 * @template QueryType - The type of the Query that extends Query<Response>
 * @property {QueryBusCallback<Response, QueryType>} run - A method that takes a Query and returns either a DomainError or the response type, or a Promise of either
 */
interface QueryHandler<Response, QueryType extends Query<Response> = Query<Response>> {
	run: QueryBusCallback<Response, QueryType>;
}

/**
 * Abstract class representing a QueryBus
 */
abstract class QueryBus {
	/**
	 * Abstract method that takes a Query and returns either a DomainError or the response type, or a Promise of that either
	 * @abstract
	 * @template ResponseType - The type of the response
	 * @param {Query<ResponseType>} query - The Query to be asked
	 * @returns {Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>} - Either a DomainError or the response type, or a Promise of either
	 */
	abstract ask<ResponseType>(
		query: Query<ResponseType>
	): Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>;
}

export type { QueryBusCallback, QueryHandler };

export default QueryBus;
