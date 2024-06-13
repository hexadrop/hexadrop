import { faker } from '@faker-js/faker';

import EmailValueObject from './email.value-object';

class FakeEmailValueObject extends EmailValueObject {}

class InvalidEmailValueObject extends EmailValueObject {
	constructor() {
		super('melon');
	}
}

export default class EmailValueObjectMother {
	static create(value: string): InvalidEmailValueObject {
		return new FakeEmailValueObject(value);
	}

	static invalidValue(): InvalidEmailValueObject {
		return new InvalidEmailValueObject();
	}

	static random(): InvalidEmailValueObject {
		const value = faker.internet.email();

		return EmailValueObjectMother.create(value);
	}
}
