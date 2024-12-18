import { fakerES } from '@faker-js/faker';

import SpanishDocumentNumberValueObject from './spanish-document-number.value-object';

const NIF_REGEX = /[0-9]{8}[A-Z]/;
const CIF_REGEX = /[A-HJ-NP-SU-W][0-9]{7}[A-J]/;
const NIE_REGEX = /[X-Z][0-9]{7,8}[A-Z]/;

const REGEXS = [NIF_REGEX, CIF_REGEX, NIE_REGEX];

class FakeSpanishDocumentNumberValueObject extends SpanishDocumentNumberValueObject {}

class InvalidSpanishDocumentNumberValueObject extends SpanishDocumentNumberValueObject {
	constructor() {
		super('melon');
	}
}

export default class InvalidSpanishDocumentNumberValueObjectMother {
	static create(value: string): InvalidSpanishDocumentNumberValueObject {
		return new FakeSpanishDocumentNumberValueObject(value);
	}

	static invalidValue(): InvalidSpanishDocumentNumberValueObject {
		return new InvalidSpanishDocumentNumberValueObject();
	}

	static random(): InvalidSpanishDocumentNumberValueObject {
		const regex = fakerES.helpers.arrayElement(REGEXS);
		const value = fakerES.helpers.fromRegExp(regex);

		return InvalidSpanishDocumentNumberValueObjectMother.create(value);
	}
}
