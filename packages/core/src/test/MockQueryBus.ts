import { expect, vi } from 'vitest';
import { Query } from '../cqrs/Query';
import { QueryBus } from '../cqrs/QueryBus';
import { Either } from '../Either';
import { DomainError } from '../error';

export class MockQueryBus implements QueryBus {
	askSpy = vi.fn<[Query], Either<any, DomainError> | Promise<Either<any, DomainError>>>();

	ask<Q extends Query, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		return this.askSpy(query);
	}

	assertAskedQueries(...expectedQueries: Query[]) {
		const spyCalls = this.askSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastAskedQueries = spyCalls.map(call => call[0]) as Query[];

		expect(expectedQueries).toMatchObject(lastAskedQueries);
	}

	assertLastAskedQuery(expectedQuery: Query) {
		const spyCalls = this.askSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastSpyCall = spyCalls[spyCalls.length - 1];
		const lastQuery = lastSpyCall[0];

		expect(expectedQuery).toMatchObject(lastQuery);
	}

	assertNotAskedQuery() {
		const askSpyCalls = this.askSpy.mock.calls;

		expect(askSpyCalls.length).toBe(0);
	}
}
