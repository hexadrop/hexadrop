import { WordMother } from '@hexadrop/mother/src';
import { InvalidArgumentError } from '../../../src';

class ExtendsInvalidArgumentError extends InvalidArgumentError {
	constructor(message: string, name?: string, code?: string) {
		super(message, name, code);
	}
}

export class InvalidArgumentErrorMother {
	static create(message: string, name?: string, code?: string): ExtendsInvalidArgumentError {
		return new ExtendsInvalidArgumentError(message, name, code);
	}

	static creator() {
		return () => InvalidArgumentErrorMother.random();
	}

	static random() {
		const message = WordMother.random();
		const name = WordMother.random();
		return this.create(message, name, 'TST(400)');
	}
}
