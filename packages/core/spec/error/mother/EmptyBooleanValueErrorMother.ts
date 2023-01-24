import { WordMother } from '@hexadrop/mother';

import { EmptyBooleanValueError } from '../../../src/error/EmptyBooleanValueError';

export class EmptyBooleanValueErrorMother {
	static create(property?: string): EmptyBooleanValueError {
		return new EmptyBooleanValueError(property);
	}

	static random(): EmptyBooleanValueError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): EmptyBooleanValueError {
		return this.create();
	}
}
