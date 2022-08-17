import { WordMother } from '@hexadrop/mother/src';
import { InvalidNumberValueTypeError } from '../../../src/error/InvalidNumberValueTypeError';

export class InvalidNumberValueTypeErrorMother {
	static create(property?: string): InvalidNumberValueTypeError {
		return new InvalidNumberValueTypeError(property);
	}

	static creator() {
		return () => InvalidNumberValueTypeErrorMother.random();
	}

	static random() {
		const property = WordMother.random();
		return this.create(property);
	}

	static randomWithoutProperty() {
		return this.create();
	}
}
