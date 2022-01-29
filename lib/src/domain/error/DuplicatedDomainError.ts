import { DomainError } from './DomainError';

export class DuplicatedDomainError extends DomainError {
	constructor(domain: string, id: string, param = 'id') {
		super(603, `${domain} with ${param} '${id}' already exist`);
		Object.setPrototypeOf(this, DuplicatedDomainError.prototype);
	}
}
