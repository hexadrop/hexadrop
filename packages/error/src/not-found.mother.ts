import DomainNotFoundError from './not-found';

export default class DomainNotFoundErrorMother {
	static create(domain: string, id: string, parameter?: string, name?: string, code?: string): DomainNotFoundError {
		return new DomainNotFoundError(domain, id, parameter, name, code);
	}
}
