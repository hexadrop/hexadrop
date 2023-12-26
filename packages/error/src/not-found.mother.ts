import DomainNotFoundError from './not-found';

export default class DomainNotFoundErrorMother {
	static create(domain: string, id: string, param?: string, name?: string, code?: string): DomainNotFoundError {
		return new DomainNotFoundError(domain, id, param, name, code);
	}
}
