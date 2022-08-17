import { WordMother } from '@hexadrop/mother/src';
import { InvalidStringValueTypeError } from '../../../src/error/InvalidStringValueTypeError';

export class InvalidStringValueTypeErrorMother {
	static create(property?: string): InvalidStringValueTypeError {
		return new InvalidStringValueTypeError(property);
	}

	static creator() {
		return () => InvalidStringValueTypeErrorMother.random();
	}

	static random() {
		const property = WordMother.random();
		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
