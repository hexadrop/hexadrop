import { UuidMother, WordMother } from '@hexadrop/testing';

import DomainNotFoundError from './not-found';

export default class DomainNotFoundErrorMother {
	static create(domain: string, id: string, param?: string, name?: string, code?: string): DomainNotFoundError {
		return new DomainNotFoundError(domain, id, param, name, code);
	}

	static random(): DomainNotFoundError {
		const domain = WordMother.random();
		const id = UuidMother.random();
		const param = WordMother.random();

		return this.create(domain, id, param);
	}

	static randomWithCode(code: string): DomainNotFoundError {
		const domain = WordMother.random();
		const id = UuidMother.random();
		const param = WordMother.random();

		return this.create(domain, id, param, undefined, code);
	}

	static randomWithOutParam(): DomainNotFoundError {
		const domain = WordMother.random();
		const id = UuidMother.random();

		return this.create(domain, id);
	}
}
