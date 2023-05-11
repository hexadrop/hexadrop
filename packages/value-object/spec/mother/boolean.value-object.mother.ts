import { BooleanMother } from '@hexadrop/testing';
import { BooleanValueObject } from '@hexadrop/value-object';

export class FakeBooleanValueObject extends BooleanValueObject {}

export class InvalidStringBooleanValueObject extends BooleanValueObject {
	constructor() {
		// @ts-ignore
		super('a');
	}
}

export class UndefinedStringBooleanValueObject extends BooleanValueObject {
	constructor() {
		// @ts-ignore
		super(undefined);
	}
}

export class BooleanValueObjectMother {
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
		const value = BooleanMother.random();

		return this.create(value);
	}
}
