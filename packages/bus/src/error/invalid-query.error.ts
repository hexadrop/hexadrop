import { DomainError } from '@hexadrop/error';

export class InvalidQueryError extends DomainError {
	constructor() {
		super('InvalidQueryError', `The query hasn't an 'QUERY_NAME' static property`, 'HEX(500)');
	}
}
