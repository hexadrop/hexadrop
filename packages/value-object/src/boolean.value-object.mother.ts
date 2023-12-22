import BooleanValueObject from './boolean.value-object';

class FakeBooleanValueObject extends BooleanValueObject {}

class InvalidStringBooleanValueObject extends BooleanValueObject {
	constructor() {
		// @ts-expect-error - Testing purposes
		super('a');
	}
}

class UndefinedStringBooleanValueObject extends BooleanValueObject {
	constructor() {
		// @ts-expect-error - Testing purposes
		super(undefined);
	}
}

export default class BooleanValueObjectMother {
	static create(value: boolean): BooleanValueObject {
		return new FakeBooleanValueObject(value);
	}

	static invalidWithString(): BooleanValueObject {
		return new InvalidStringBooleanValueObject();
	}

	static invalidWithUndefined(): BooleanValueObject {
		return new UndefinedStringBooleanValueObject();
	}

	static random(): BooleanValueObject {
		const value = Math.random() > 0.5;

		return BooleanValueObjectMother.create(value);
	}
}
