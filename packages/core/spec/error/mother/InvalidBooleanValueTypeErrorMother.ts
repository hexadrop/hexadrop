import { WordMother } from '@hexadrop/mother';

import { InvalidBooleanValueTypeError } from '../../../src/error/InvalidBooleanValueTypeError';

export class InvalidBooleanValueTypeErrorMother {
	static create(property?: string): InvalidBooleanValueTypeError {
		return new InvalidBooleanValueTypeError(property);
	}

	static random(): InvalidBooleanValueTypeError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): InvalidBooleanValueTypeError {
		return this.create();
	}
}
