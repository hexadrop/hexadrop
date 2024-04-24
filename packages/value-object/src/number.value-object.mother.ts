import { faker } from '@faker-js/faker';

import NumberValueObject from './number.value-object';

class FakeNumberValueObject extends NumberValueObject {}

class InvalidStringNumberValueObject extends NumberValueObject {
	constructor() {
		// @ts-expect-error - Testing purposes
		super('a');
	}
}

class UndefinedStringNumberValueObject extends NumberValueObject {
	// eslint-disable-next-line typescript/no-useless-constructor -- Testing purposes
	constructor() {
		// @ts-expect-error - Testing purposes
		super();
	}
}

export default class NumberValueObjectMother {
	static create(value: number): NumberValueObject {
		return new FakeNumberValueObject(value);
	}

	static invalidWithString(): NumberValueObject {
		return new InvalidStringNumberValueObject();
	}

	static invalidWithUndefined(): NumberValueObject {
		return new UndefinedStringNumberValueObject();
	}

	static random(): NumberValueObject {
		const value = faker.number.int();

		return NumberValueObjectMother.create(value);
	}
}
