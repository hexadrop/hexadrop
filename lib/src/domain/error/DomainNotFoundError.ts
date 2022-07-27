import { DomainError } from './DomainError';

export class DomainNotFoundError extends DomainError {
	constructor(domain: string, id: string, param = 'id', code = 'HEX(404)') {
		super(`${domain} with ${param} '${id}' was not found`, 'DomainNotFoundError', code);
	}
}
