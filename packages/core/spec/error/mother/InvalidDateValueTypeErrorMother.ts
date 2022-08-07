import { InvalidDateValueTypeError } from '../../../src/error/InvalidDateValueTypeError';

export class InvalidDateValueTypeErrorMother {
	static create(): InvalidDateValueTypeError {
		return new InvalidDateValueTypeError();
	}

	static creator() {
		return () => InvalidDateValueTypeErrorMother.random();
	}

	static random() {
		return this.create();
	}
}
