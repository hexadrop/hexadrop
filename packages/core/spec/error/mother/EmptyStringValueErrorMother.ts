import { WordMother } from '@hexadrop/mother';

import { EmptyStringValueError } from '../../../src/error/EmptyStringValueError';

export class EmptyStringValueErrorMother {
	static create(property?: string): EmptyStringValueError {
		return new EmptyStringValueError(property);
	}

	static random(): EmptyStringValueError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): EmptyStringValueError {
		return this.create();
	}
}
