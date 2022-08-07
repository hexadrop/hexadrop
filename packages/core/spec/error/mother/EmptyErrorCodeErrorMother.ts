import { EmptyErrorCodeError } from '../../../src';

export class EmptyErrorCodeErrorMother {
	static create(): EmptyErrorCodeError {
		return new EmptyErrorCodeError();
	}

	static creator() {
		return () => EmptyErrorCodeErrorMother.random();
	}

	static random() {
		return this.create();
	}
}
