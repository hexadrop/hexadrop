import { fakerES } from '@faker-js/faker';

import SpanishPhoneNumberValueObject from './spanish-phone-number.value-object';

class FakeSpanishPhoneNumberValueObject extends SpanishPhoneNumberValueObject {}

class InvalidSpanishPhoneNumberValueObject extends SpanishPhoneNumberValueObject {
	constructor() {
		super('melon');
	}
}

export default class InvalidSpanishPhoneNumberValueObjectMother {
	static create(value: string): InvalidSpanishPhoneNumberValueObject {
		return new FakeSpanishPhoneNumberValueObject(value);
	}

	static invalidValue(): InvalidSpanishPhoneNumberValueObject {
		return new InvalidSpanishPhoneNumberValueObject();
	}

	static random(): InvalidSpanishPhoneNumberValueObject {
		const value = fakerES.phone.number().replaceAll('-', '').replaceAll(' ', '').replaceAll('.', '');

		return InvalidSpanishPhoneNumberValueObjectMother.create(value);
	}
}
