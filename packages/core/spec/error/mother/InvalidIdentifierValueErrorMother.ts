import { WordMother } from '@hexadrop/mother';
import { InvalidIdentifierValueError } from '../../../src/error/InvalidIdentifierValueError';

export class InvalidIdentifierValueErrorMother {
	static create(value: string, property?: string): InvalidIdentifierValueError {
		return new InvalidIdentifierValueError(property, value);
	}

	static creator() {
		return () => InvalidIdentifierValueErrorMother.random();
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
