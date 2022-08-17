import { WordMother } from '@hexadrop/mother';
import { EmptyNumberValueError } from '../../../src/error/EmptyNumberValueError';

export class EmptyNumberValueErrorMother {
	static create(property?: string): EmptyNumberValueError {
		return new EmptyNumberValueError(property);
	}

	static creator() {
		return () => EmptyNumberValueErrorMother.random();
	}

	static random() {
		const property = WordMother.random();
		return this.create(property);
	}

	static randomWithNoProperty() {
		return this.create();
	}
}
