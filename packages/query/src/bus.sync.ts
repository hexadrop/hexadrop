import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type QueryBus from './bus';
import { QueryHandlerError } from './error';
import type Query from './query';
import QueryHandlers from './query-handlers';
/**
 * SyncQueryBus is a class that implements the QueryBus interface.
 * It is used to handle queries synchronously.
 *
 * @property {QueryHandlers} info - An instance of QueryHandlers that contains the query handlers.
 */
export default class SyncQueryBus implements QueryBus {
	private readonly info: QueryHandlers;

	/**
	 * Constructs a new instance of the SyncQueryBus class.
	 *
	 * @param {QueryHandlers} info - An instance of QueryHandlers that contains the query handlers.
	 */
	constructor(info: QueryHandlers) {
		this.info = info;
	}

	/**
	 * This method is used to ask a query.
	 * It searches for the appropriate handler for the query and executes it.
	 * If an error occurs during the execution of the handler, it returns a DomainError.
	 *
	 * @param {Query<ResponseType>} query - The query to be asked.
	 * @returns {Promise<Either<DomainError, ResponseType>>} - The response from the query handler or a DomainError.
	 * @template ResponseType - The type of the response that the query handler should return.
	 */
	async ask<const ResponseType>(query: Query<ResponseType>): Promise<Either<DomainError, ResponseType>> {
		const handler = await this.info.search<ResponseType, Query<ResponseType>>(query);

		try {
			return await handler(query);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}

			return Either.left(new QueryHandlerError(error));
		}
	}
}
