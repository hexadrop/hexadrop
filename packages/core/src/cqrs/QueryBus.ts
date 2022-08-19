import type { Either } from '../Either';
import type { DomainError } from '../error';
import type { Query } from './Query';

export interface QueryBus {
	ask<Q extends Query, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>>;
}
