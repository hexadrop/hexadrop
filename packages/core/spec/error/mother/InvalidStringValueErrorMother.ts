import { WordMother } from '@hexadrop/mother';

import { InvalidStringValueError } from '../../../src/error/InvalidStringValueError';

export class InvalidStringValueErrorMother {
	static create(value: string, property?: string): InvalidStringValueError {
		return new InvalidStringValueError(property, value);
	}

	static creator() {
		return () => InvalidStringValueErrorMother.random();
	}

	static random() {
		const value = WordMother.random();
		const property = WordMother.random();

		return this.create(value, property);
	}

	static randomWithNoProperty() {
		const value = WordMother.random();

		return this.create(value);
	}
}
