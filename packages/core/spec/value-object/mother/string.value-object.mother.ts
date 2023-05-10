import { WordMother } from '@hexadrop/mother';

import { StringValueObject } from '../../../src';

export class FakeStringValueObject extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}

export class InvalidNumberStringValueObject extends StringValueObject {
	constructor() {
		// @ts-ignore
		super(1);
	}
}

export class InvalidStringValueObject extends StringValueObject<'pera' | 'sandia'> {
	constructor() {
		// @ts-ignore
		super('melon', ['sandia', 'pera']);
	}
}

export class UndefinedStringStringValueObject extends StringValueObject {
	constructor() {
		// @ts-ignore
		super(undefined);
	}
}

export class StringValueObjectMother {
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
		const value = WordMother.random();

		return this.create(value);
	}
}
