import { Either } from '../Either';
import { DomainError } from '../error';
import { Query } from './Query';

export interface QueryBus {
	ask<Q extends Query<R>, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>>;
}
