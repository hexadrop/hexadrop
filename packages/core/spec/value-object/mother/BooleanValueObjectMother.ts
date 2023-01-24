import { BooleanMother } from '@hexadrop/mother';

import { BooleanValueObject } from '../../../src';

export class FakeBooleanValueObject extends BooleanValueObject {
	constructor(value: boolean) {
		super(value);
	}
}

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
