import { WordMother } from '@hexadrop/mother';

import { EmptyStringValueError } from '../../../src/error/EmptyStringValueError';

export class EmptyStringValueErrorMother {
	static create(property?: string): EmptyStringValueError {
		return new EmptyStringValueError(property);
	}

	static creator() {
		return () => EmptyStringValueErrorMother.random();
	}

	static random() {
		const property = WordMother.random();

		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
