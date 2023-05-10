import type { Either } from '../either';
import type { DomainError } from '../error';
import type { Query } from './query';

export interface QueryBus {
	ask<Q extends Query, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>>;
}
