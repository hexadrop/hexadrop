import { DomainError, Either, Query, QueryBus } from '../../domain';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
	constructor(private readonly map: QueryHandlersInformation) {
	}

	ask<Q extends Query<R>, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		const handler = this.map.search<Q, R>(query);
		return handler.handle(query);
	}
}
