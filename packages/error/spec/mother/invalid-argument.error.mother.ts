import { InvalidArgumentError } from '@hexadrop/error';
import { WordMother } from '@hexadrop/testing';

class ExtendsInvalidArgumentError extends InvalidArgumentError {}

export class InvalidArgumentErrorMother {
	static create(message: string, name?: string, code?: string): ExtendsInvalidArgumentError {
		return new ExtendsInvalidArgumentError(message, name, code);
	}

	static random(): ExtendsInvalidArgumentError {
		const message = WordMother.random();
		const name = WordMother.random();

		return this.create(message, name, 'TST(400)');
	}
}
