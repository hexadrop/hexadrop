import { WordMother } from '@hexadrop/mother';

import { EmptyDateValueError } from '../../../src/error/EmptyDateValueError';

export class EmptyDateValueErrorMother {
	static create(property?: string): EmptyDateValueError {
		return new EmptyDateValueError(property);
	}

	static creator() {
		return () => EmptyDateValueErrorMother.random();
	}

	static random() {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
