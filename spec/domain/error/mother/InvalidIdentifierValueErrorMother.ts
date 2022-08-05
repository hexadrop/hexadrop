import { InvalidIdentifierValueError } from '../../../../src/domain/error/InvalidIdentifierValueError';
import { WordMother } from '../../../../src/test';

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
