import { IntegerMother } from '@hexadrop/mother';

import { NumberValueObject } from '../../../src';

export class FakeNumberValueObject extends NumberValueObject {}

export class InvalidStringNumberValueObject extends NumberValueObject {
	constructor() {
		// @ts-ignore
		super('a');
	}
}

export class UndefinedStringNumberValueObject extends NumberValueObject {
	constructor() {
		// @ts-ignore
		super(undefined);
	}
}

export class NumberValueObjectMother {
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
		const value = IntegerMother.random();

		return this.create(value);
	}
}
