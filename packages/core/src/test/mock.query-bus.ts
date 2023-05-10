import type { SinonStub } from 'sinon';
import { assert, stub } from 'sinon';

import type { Query } from '../cqrs/query';
import type { QueryBus } from '../cqrs/query-bus';
import type { Either } from '../either';
import type { DomainError } from '../error';

export class MockQueryBus implements QueryBus {
	readonly askSpy: SinonStub<
		[Query],
		Either<any, DomainError> | Promise<Either<any, DomainError>>
	>;

	constructor() {
		this.askSpy = stub<[Query], Either<any, DomainError> | Promise<Either<any, DomainError>>>();
	}

	private static getDataFromQuery(command: Query) {
		const { queryId: _q, ...attributes } = command;

		return attributes;
	}

	ask<Q extends Query, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		return this.askSpy(query);
	}

	askRejects(error: Error): void {
		this.askSpy.rejects(error);
	}

	askResolve(value: Either<any, DomainError>): void {
		this.askSpy.resolves(value);
	}

	assertAskedQueries(...expectedQueries: Query[]): void {
		assert.called(this.askSpy);
		const eventsArr = this.askSpy
			.getCalls()
			.map(c => c.args)
			.flat();
		assert.match(eventsArr.length, expectedQueries.length);
		assert.match(
			eventsArr.map(e => MockQueryBus.getDataFromQuery(e)),
			expectedQueries.map(e => MockQueryBus.getDataFromQuery(e))
		);
	}

	assertLastAskedQuery(expectedQuery: Query): void {
		assert.called(this.askSpy);
		const lastSpyCall = this.askSpy.lastCall;
		const eventsArr = lastSpyCall.args;
		assert.match(
			MockQueryBus.getDataFromQuery(eventsArr[0]),
			MockQueryBus.getDataFromQuery(expectedQuery)
		);
	}

	assertNotAskedQuery(): void {
		assert.notCalled(this.askSpy);
	}
}
