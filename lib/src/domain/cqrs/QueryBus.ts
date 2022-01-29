import { Either } from '../Either';
import { DomainError } from '../error/DomainError';
import { Query } from './Query';
import { Response } from './Response';

export interface QueryBus {
	ask<R extends Response, E extends DomainError>(query: Query<R>): Promise<Either<R, E>>;
}
