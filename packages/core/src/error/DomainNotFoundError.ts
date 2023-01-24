import { DomainError } from './DomainError';

export class DomainNotFoundError extends DomainError {
	constructor(
		domain: string,
		id: string,
		param = 'id',
		name = 'DomainNotFoundError',
		code = 'HEX(404)'
	) {
		super(name, `${domain} with ${param} '${id}' was not found`, code);
	}
}
