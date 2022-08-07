import { InvalidBooleanValueTypeError } from '../../../src/error/InvalidBooleanValueTypeError';

export class InvalidBooleanValueTypeErrorMother {
	static create(): InvalidBooleanValueTypeError {
		return new InvalidBooleanValueTypeError();
	}

	static creator() {
		return () => InvalidBooleanValueTypeErrorMother.random();
	}

	static random() {
		return this.create();
	}
}
