import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { Query, QueryClass } from './query';

export type QueryBusCallback<Response = unknown, Q extends Query<Response> = Query<Response>> = (
	query: Q
) => Either<Response, DomainError> | Promise<Either<Response, DomainError>>;

export interface QueryBus {
	ask<R>(query: Query<R>): Either<R, DomainError> | Promise<Either<R, DomainError>>;

	register<R, C extends Query<R>>(query: QueryClass<R, C>, useCase: Handler<C>): void;

	register<R, C extends Query<R>>(
		query: QueryClass<R, C>,
		callback: QueryBusCallback<R, C>
	): void;

	unregister<R, C extends Query<R>>(query: QueryClass<R, C>): void;
}
