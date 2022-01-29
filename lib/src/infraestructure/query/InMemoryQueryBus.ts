import { DomainError, Either, Query, QueryBus, Response } from '../../domain';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
	constructor(private readonly map: QueryHandlersInformation) {}

	async ask<R extends Response, Q extends Query<R>, E extends DomainError>(query: Q): Promise<Either<R, E>> {
		const handler = this.map.search<R, Q, E>(query);
		return await handler.handle(query);
	}
}
