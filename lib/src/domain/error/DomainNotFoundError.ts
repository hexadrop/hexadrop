import { DomainError } from './DomainError';

export class DomainNotFoundError extends DomainError {
	constructor(domain: string, id: string, param = 'id') {
		super(404, `${domain} with ${param} '${id}' was not found`);
		Object.setPrototypeOf(this, DomainNotFoundError.prototype);
	}
}
