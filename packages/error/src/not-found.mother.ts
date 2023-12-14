import { faker } from '@faker-js/faker';

import DomainNotFoundError from './not-found';

export default class DomainNotFoundErrorMother {
	static create(domain: string, id: string, param?: string, name?: string, code?: string): DomainNotFoundError {
		return new DomainNotFoundError(domain, id, param, name, code);
	}

	static random(): DomainNotFoundError {
		const domain = faker.lorem.word();
		const id = crypto.randomUUID();
		const param = faker.lorem.word();

		return this.create(domain, id, param);
	}

	static randomWithCode(code: string): DomainNotFoundError {
		const domain = faker.lorem.word();
		const id = crypto.randomUUID();
		const param = faker.lorem.word();

		return this.create(domain, id, param, undefined, code);
	}

	static randomWithOutParam(): DomainNotFoundError {
		const domain = faker.lorem.word();
		const id = crypto.randomUUID();

		return this.create(domain, id);
	}
}
