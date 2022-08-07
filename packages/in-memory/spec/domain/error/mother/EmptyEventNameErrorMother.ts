import { WordMother } from '@hexadrop/mother';
import { EmptyEventNameError } from '../../../../src';

export class EmptyEventNameErrorMother {
	static create(command: string): EmptyEventNameError {
		return new EmptyEventNameError(command);
	}

	static creator() {
		return () => EmptyEventNameErrorMother.random();
	}

	static random() {
		const word = WordMother.random();
		return this.create(word);
	}
}
