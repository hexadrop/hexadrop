import { Either } from '../Either';
import { DomainError } from '../error';
import { Query, QueryClass } from './Query';

export interface QueryHandler<Q extends Query<R>, R, E extends DomainError> {
	handle(query: Q): Promise<Either<R, E>>;

	subscribedTo(): QueryClass<Q>;
}
