import { faker } from '@faker-js/faker';

import StringValueObject from './string.value-object';

class FakeStringValueObject extends StringValueObject {}

class InvalidNumberStringValueObject extends StringValueObject {
	constructor() {
		// @ts-expect-error - Testing purposes
		super(1);
	}
}

class InvalidStringValueObject extends StringValueObject<'pera' | 'sandia'> {
	constructor() {
		// @ts-expect-error - Testing purposes
		super('melon', [
			'sandia',
			'pera',
		]);
	}
}

class UndefinedStringStringValueObject extends StringValueObject {
	// eslint-disable-next-line typescript/no-useless-constructor -- Testing purposes
	constructor() {
		// @ts-expect-error - Testing purposes
		super();
	}
}

export default class StringValueObjectMother {
	static create(value: string): StringValueObject {
		return new FakeStringValueObject(value);
	}

	static invalidValue(): StringValueObject {
		return new InvalidStringValueObject();
	}

	static invalidWithNumber(): StringValueObject {
		return new InvalidNumberStringValueObject();
	}

	static invalidWithUndefined(): StringValueObject {
		return new UndefinedStringStringValueObject();
	}

	static random(): StringValueObject {
		const value = faker.lorem.word();

		return StringValueObjectMother.create(value);
	}
}
