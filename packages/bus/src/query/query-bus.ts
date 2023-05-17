import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { Query, QueryClass } from './query';

export type QueryBusCallback<Response = unknown, Q extends Query<Response> = Query<Response>> = (
	query: Q
) => Either<Response, DomainError> | Promise<Either<Response, DomainError>>;

export interface QueryBus {
	ask<R>(query: Query<R>): Either<R, DomainError> | Promise<Either<R, DomainError>>;

	register<R, Q extends Query<R>>(query: QueryClass<R, Q>, useCase: Handler<Q, R>): void;

	register<R, Q extends Query<R>>(
		query: QueryClass<R, Q>,
		callback: QueryBusCallback<R, Q>
	): void;

	unregister<R, C extends Query<R>>(query: QueryClass<R, C>): void;
}
