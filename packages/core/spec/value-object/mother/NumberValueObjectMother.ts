import { IntegerMother } from '@hexadrop/mother';

import { NumberValueObject } from '../../../src';

export class FakeNumberValueObject extends NumberValueObject {
	constructor(value: number) {
		super(value);
	}
}

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

	static creator() {
		return () => NumberValueObjectMother.random();
	}

	static invalidWithString() {
		return new InvalidStringNumberValueObject();
	}

	static invalidWithUndefined() {
		return new UndefinedStringNumberValueObject();
	}

	static random() {
		const value = IntegerMother.random();

		return this.create(value);
	}
}
