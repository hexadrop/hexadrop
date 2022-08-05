import { InvalidBooleanValueTypeError } from '../../../../src/domain/error/InvalidBooleanValueTypeError';

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
