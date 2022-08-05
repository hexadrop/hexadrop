import { DateValueObject } from '../../../../src';
import { DateMother } from '../../../../src/test';

export class FakeDateValueObject extends DateValueObject {
	constructor(value: Date) {
		super(value);
	}
}

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

	static creator() {
		return () => DateValueObjectMother.random();
	}

	static random() {
		const value = DateMother.recent();
		return this.create(value);
	}

	static invalidWithString() {
		return new InvalidStringDateValueObject();
	}

	static invalidWithUndefined() {
		return new UndefinedStringDateValueObject();
	}
}
