import { WordMother } from '@hexadrop/mother';

import { InvalidDateValueTypeError } from '../../../src/error/InvalidDateValueTypeError';

export class InvalidDateValueTypeErrorMother {
	static create(property?: string): InvalidDateValueTypeError {
		return new InvalidDateValueTypeError(property);
	}

	static random(): InvalidDateValueTypeError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): InvalidDateValueTypeError {
		return this.create();
	}
}
