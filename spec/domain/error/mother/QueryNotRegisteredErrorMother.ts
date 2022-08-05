import { QueryNotRegisteredError } from '../../../../src/domain/error/QueryNotRegisteredError';
import { WordMother } from '../../../../src/test';

export class QueryNotRegisteredErrorMother {
	static create(query: string): QueryNotRegisteredError {
		return new QueryNotRegisteredError(query);
	}

	static creator() {
		return () => QueryNotRegisteredErrorMother.random();
	}

	static random() {
		const query = WordMother.random();
		return this.create(query);
	}
}
