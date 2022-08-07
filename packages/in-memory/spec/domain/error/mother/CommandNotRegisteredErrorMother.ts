import { WordMother } from '@hexadrop/mother';
import { CommandNotRegisteredError } from '../../../../src';

export class CommandNotRegisteredErrorMother {
	static create(command: string): CommandNotRegisteredError {
		return new CommandNotRegisteredError(command);
	}

	static creator() {
		return () => CommandNotRegisteredErrorMother.random();
	}

	static random() {
		const word = WordMother.random();
		return this.create(word);
	}
}
