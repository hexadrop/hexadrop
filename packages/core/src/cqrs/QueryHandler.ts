import type { Either } from '../Either';
import type { DomainError } from '../error';
import type { Query, QueryClass } from './Query';

export interface QueryHandler<Q extends Query, R> {
	handle(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>>;

	subscribedTo(): QueryClass<Q>;
}
