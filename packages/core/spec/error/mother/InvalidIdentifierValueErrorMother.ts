import { WordMother } from '@hexadrop/mother';
import { InvalidIdentifierValueError } from '../../../src/error/InvalidIdentifierValueError';

export class InvalidIdentifierValueErrorMother {
	static create(value: string): InvalidIdentifierValueError {
		return new InvalidIdentifierValueError(value);
	}

	static creator() {
		return () => InvalidIdentifierValueErrorMother.random();
	}

	static random() {
		const word = WordMother.random();
		return this.create(word);
	}
}
