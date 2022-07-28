import { Either } from '../Either';
import { DomainError } from '../error';
import { Query } from './Query';
import { Response } from './Response';

export type QueryCtor<T> = new (...args: unknown[]) => T;

export interface QueryHandler<R extends Response, Q extends Query<R>, E extends DomainError> {
	handle(query: Q): Promise<Either<R, E>>;

	subscribedTo(): QueryCtor<Q>;
}
