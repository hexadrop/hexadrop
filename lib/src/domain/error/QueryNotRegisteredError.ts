import { Query } from '../cqrs/Query';
import { DomainError } from './DomainError';

export class QueryNotRegisteredError<T extends Response> extends DomainError {
	constructor(query: Query<T>) {
		super(601, `The query <${query.constructor.name}> hasn't a query handler associated`);
		Object.setPrototypeOf(this, QueryNotRegisteredError.prototype);
	}
}
