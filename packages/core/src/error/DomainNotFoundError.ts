import { DomainError } from './DomainError';

export class DomainNotFoundError extends DomainError {
	constructor(domain: string, id: string, param = 'id', code = 'HEX(404)') {
		super('DomainNotFoundError', `${domain} with ${param} '${id}' was not found`, code);
	}
}
