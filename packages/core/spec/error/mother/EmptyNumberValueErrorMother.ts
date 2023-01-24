import { WordMother } from '@hexadrop/mother';

import { EmptyNumberValueError } from '../../../src/error/EmptyNumberValueError';

export class EmptyNumberValueErrorMother {
	static create(property?: string): EmptyNumberValueError {
		return new EmptyNumberValueError(property);
	}

	static random(): EmptyNumberValueError {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty(): EmptyNumberValueError {
		return this.create();
	}
}
