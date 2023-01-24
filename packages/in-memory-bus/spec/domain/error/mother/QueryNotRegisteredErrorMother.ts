import { WordMother } from '@hexadrop/mother';

import { QueryNotRegisteredError } from '../../../../src';

export class QueryNotRegisteredErrorMother {
	static create(query: string): QueryNotRegisteredError {
		return new QueryNotRegisteredError(query);
	}

	static random(): QueryNotRegisteredError {
		const query = WordMother.random();

		return this.create(query);
	}
}
