import { WordMother } from '@hexadrop/mother';
import { InvalidDateValueTypeError } from '../../../src/error/InvalidDateValueTypeError';

export class InvalidDateValueTypeErrorMother {
	static create(property?: string): InvalidDateValueTypeError {
		return new InvalidDateValueTypeError(property);
	}

	static creator() {
		return () => InvalidDateValueTypeErrorMother.random();
	}

	static random() {
		const property = WordMother.random();
		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
