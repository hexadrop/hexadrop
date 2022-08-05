import { Either } from '../Either';
import { DomainError } from '../error';
import { Query } from './Query';

export interface QueryBus {
	ask<Q extends Query<R>, R, E extends DomainError>(query: Q): Promise<Either<R, E>>;
}
