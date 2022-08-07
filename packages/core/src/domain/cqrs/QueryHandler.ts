import { Either } from '../Either';
import { DomainError } from '../error';
import { Query, QueryClass } from './Query';

export interface QueryHandler<Q extends Query, R> {
	handle(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>>;

	subscribedTo(): QueryClass<Q>;
}
