import { WordMother } from '@hexadrop/mother';

import { InvalidStringValueTypeError } from '../../../src/error/InvalidStringValueTypeError';

export class InvalidStringValueTypeErrorMother {
	static create(property?: string): InvalidStringValueTypeError {
		return new InvalidStringValueTypeError(property);
	}

	static random(): InvalidStringValueTypeError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): InvalidStringValueTypeError {
		return this.create();
	}
}
