import type { DomainError } from '../error';
import type { Either } from '../types';
import type { Query, QueryClass } from './query';
import type { UseCase } from './use-case';

export type QueryBusCallback<Response, Q extends Query<Response>> = (
	query: Q
) => Either<Response, DomainError> | Promise<Either<Response, DomainError>>;

export interface QueryBus {
	ask<R>(query: Query<R>): Either<R, DomainError> | Promise<Either<R, DomainError>>;

	register<R, C extends Query<R>>(query: QueryClass<R, C>, useCase: UseCase<C>): void;

	register<R, C extends Query<R>>(
		query: QueryClass<R, C>,
		callback: QueryBusCallback<R, C>
	): void;

	unregister<R, C extends Query<R>>(query: QueryClass<R, C>, useCase: UseCase<C>): void;

	unregister<R, C extends Query<R>>(
		query: QueryClass<R, C>,
		callback: QueryBusCallback<R, C>
	): void;
}
