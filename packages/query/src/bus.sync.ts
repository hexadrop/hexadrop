import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type QueryBus from './bus';
import { QueryHandlerError } from './error';
import type Query from './query';
import QueryHandlers from './query-handlers';

export default class SyncQueryBus implements QueryBus {
	private readonly info: QueryHandlers;
	constructor(info: QueryHandlers) {
		this.info = info;
	}

	ask<ResponseType>(
		query: Query<ResponseType>
	): Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>> {
		const handler = this.info.search<ResponseType, Query<ResponseType>>(query);

		try {
			return handler(query);
		} catch (error) {
			return Either.left(new QueryHandlerError(error as Error));
		}
	}
}
