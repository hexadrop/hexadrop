import { faker } from '@faker-js/faker';

import DateValueObject from './date.value-object';

class FakeDateValueObject extends DateValueObject {}

class UndefinedStringDateValueObject extends DateValueObject {
	// eslint-disable-next-line typescript/no-useless-constructor -- Testing purposes
	constructor() {
		// @ts-expect-error - Testing purposes
		super();
	}
}

export default class DateValueObjectMother {
	static create(value: Date | number | string): DateValueObject {
		return new FakeDateValueObject(value);
	}

	static invalidWithUndefined(): DateValueObject {
		return new UndefinedStringDateValueObject();
	}

	static random(): DateValueObject {
		const value = faker.date.recent();

		return DateValueObjectMother.create(value);
	}
}
