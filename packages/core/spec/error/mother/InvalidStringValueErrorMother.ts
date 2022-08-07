import { WordMother } from '@hexadrop/mother';
import { InvalidStringValueError } from '../../../src/error/InvalidStringValueError';

export class InvalidStringValueErrorMother {
	static create(value: string): InvalidStringValueError {
		return new InvalidStringValueError(value);
	}

	static creator() {
		return () => InvalidStringValueErrorMother.random();
	}

	static random() {
		const value = WordMother.random();
		return this.create(value);
	}
}
