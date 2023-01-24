import { InvalidErrorCodeError } from '../../../src';

export class InvalidErrorCodeErrorMother {
	static create(): InvalidErrorCodeError {
		return new InvalidErrorCodeError();
	}

	static random(): InvalidErrorCodeError {
		return this.create();
	}
}
