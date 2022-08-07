import { InvalidStringValueTypeError } from '../../../src/error/InvalidStringValueTypeError';

export class InvalidStringValueTypeErrorMother {
	static create(): InvalidStringValueTypeError {
		return new InvalidStringValueTypeError();
	}

	static creator() {
		return () => InvalidStringValueTypeErrorMother.random();
	}

	static random() {
		return this.create();
	}
}
