import { InvalidErrorCodeError } from '../../../../src';

export class InvalidErrorCodeErrorMother {
	static create(): InvalidErrorCodeError {
		return new InvalidErrorCodeError();
	}

	static creator() {
		return () => InvalidErrorCodeErrorMother.random();
	}

	static random() {
		return this.create();
	}
}
