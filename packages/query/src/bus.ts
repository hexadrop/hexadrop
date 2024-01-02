import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { Class } from '@hexadrop/types/class';

import type Query from './query';

/**
 * Type definition for a QueryBusCallback.
 *
 * @param {QueryType} query - The Query to be handled.
 * @returns {Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>} - Either a DomainError or the ResponseType type, or a Promise of either.
 * @template ResponseType - The type of the response that the query handler should return. Defaults to unknown.
 * @template QueryType - The type of the Query that extends Query<ResponseType>. Defaults to Query<ResponseType>.
 */
type QueryBusCallback<ResponseType = unknown, QueryType extends Query<ResponseType> = Query<ResponseType>> = (
	query: QueryType
) => Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>;

/**
 * Interface representing a QueryHandler.
 *
 * @template ResponseType - The type of the response that the query handler should return. Defaults to unknown.
 * @template QueryType - The type of the Query that extends Query<ResponseType>. Defaults to Query<ResponseType>.
 *
 * @property {QueryBusCallback<ResponseType, QueryType>} run - A QueryBusCallback function that takes a Query and returns either a DomainError or the ResponseType type, or a Promise of either.
 */
interface QueryHandler<ResponseType = unknown, QueryType extends Query<ResponseType> = Query<ResponseType>> {
	run: QueryBusCallback<ResponseType, QueryType>;
}

type QueryHandlerClass<ResponseType = unknown, QueryType extends Query<ResponseType> = Query<ResponseType>> = Class<
	any[],
	QueryHandler<ResponseType, QueryType>
>;

/**
 * Abstract class representing a QueryBus
 */
abstract class QueryBus {
	/**
	 * Abstract method that takes a Query and returns either a DomainError or the ResponseType type, or a Promise of that either
	 * @abstract
	 * @param {Query<ResponseType>} query - The Query to be asked
	 * @returns {Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>} - Either a DomainError or the ResponseType type, or a Promise of either
	 * @template ResponseType - The type of the ResponseType
	 */
	abstract ask<const ResponseType>(
		query: Query<ResponseType>
	): Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>;
}

export type { QueryBusCallback, QueryHandler, QueryHandlerClass };

export default QueryBus;
