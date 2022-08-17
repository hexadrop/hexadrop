import { WordMother } from '@hexadrop/mother/src';
import { InvalidBooleanValueTypeError } from '../../../src/error/InvalidBooleanValueTypeError';

export class InvalidBooleanValueTypeErrorMother {
	static create(property?: string): InvalidBooleanValueTypeError {
		return new InvalidBooleanValueTypeError(property);
	}

	static creator() {
		return () => InvalidBooleanValueTypeErrorMother.random();
	}

	static random() {
		const property = WordMother.random();
		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
