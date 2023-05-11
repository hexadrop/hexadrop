import { DateMother } from '@hexadrop/testing';

import { DateValueObject } from '../../src';

export class FakeDateValueObject extends DateValueObject {}

export class InvalidStringDateValueObject extends DateValueObject {
	constructor() {
		// @ts-ignore
		super('a');
	}
}

export class UndefinedStringDateValueObject extends DateValueObject {
	constructor() {
		// @ts-ignore
		super(undefined);
	}
}

export class DateValueObjectMother {
	static create(value: Date): DateValueObject {
		return new FakeDateValueObject(value);
	}

	static invalidWithString(): DateValueObject {
		return new InvalidStringDateValueObject();
	}

	static invalidWithUndefined(): DateValueObject {
		return new UndefinedStringDateValueObject();
	}

	static random(): DateValueObject {
		const value = DateMother.recent();

		return this.create(value);
	}
}
