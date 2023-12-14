import { faker } from '@faker-js/faker';

import InvalidArgumentError from './invalid-argument';

export default class InvalidArgumentErrorMother {
	static create(message: string, name?: string, code?: string): InvalidArgumentError {
		return new InvalidArgumentError(message, name, code);
	}

	static random(): InvalidArgumentError {
		const message = faker.lorem.word();
		const name = faker.lorem.word();

		return this.create(message, name, 'TST(400)');
	}
}
