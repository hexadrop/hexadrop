import { WordMother } from '@hexadrop/mother';

import { EmptyEventNameError } from '../../../../src';

export class EmptyEventNameErrorMother {
	static create(command: string): EmptyEventNameError {
		return new EmptyEventNameError(command);
	}

	static random(): EmptyEventNameError {
		const word = WordMother.random();

		return this.create(word);
	}
}
