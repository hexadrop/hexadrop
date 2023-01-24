import { WordMother } from '@hexadrop/mother';

import { EmptyDateValueError } from '../../../src/error/EmptyDateValueError';

export class EmptyDateValueErrorMother {
	static create(property?: string): EmptyDateValueError {
		return new EmptyDateValueError(property);
	}

	static random(): EmptyDateValueError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): EmptyDateValueError {
		return this.create();
	}
}
