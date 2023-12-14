import { WordMother } from '@hexadrop/testing';

import InvalidArgumentError from './invalid-argument';

export default class InvalidArgumentErrorMother {
	static create(message: string, name?: string, code?: string): InvalidArgumentError {
		return new InvalidArgumentError(message, name, code);
	}

	static random(): InvalidArgumentError {
		const message = WordMother.random();
		const name = WordMother.random();

		return this.create(message, name, 'TST(400)');
	}
}
