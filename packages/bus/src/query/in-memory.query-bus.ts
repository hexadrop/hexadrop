import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { Query, QueryClass } from './query';
import type { QueryBus, QueryBusCallback } from './query-bus';
import { QueryHandlersInformation } from './query-handlers-information';

export class InMemoryQueryBus implements QueryBus {
	private readonly info: QueryHandlersInformation;
	constructor(info?: QueryHandlersInformation) {
		this.info = info ?? new QueryHandlersInformation();
	}

	ask<R, Q extends Query<R>>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		const handler = this.info.search<R, Q>(query);

		return handler(query);
	}

	register<R, Q extends Query<R>>(query: QueryClass<R, Q>, useCase: Handler<Q, R>): void;
	register<R, Q extends Query<R>>(
		query: QueryClass<R, Q>,
		callback: QueryBusCallback<R, Q>
	): void;

	register<R, Q extends Query<R>>(
		query: QueryClass<R, Q>,
		useCaseOrCallback: Handler<Q, R> | QueryBusCallback<R, Q>
	): void {
		this.info.register(query, useCaseOrCallback);
	}

	unregister<R, C extends Query<R>>(query: QueryClass<R, C>): void {
		this.info.unregister(query);
	}
}
