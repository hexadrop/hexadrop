import { InvalidErrorCodeError } from '@hexadrop/error';

export class InvalidErrorCodeErrorMother {
	static create(): InvalidErrorCodeError {
		return new InvalidErrorCodeError();
	}

	static random(): InvalidErrorCodeError {
		return this.create();
	}
}
