import { assert, stub } from 'sinon';
import type { Query } from '../cqrs/Query';
import type { QueryBus } from '../cqrs/QueryBus';
import type { Either } from '../Either';
import type { DomainError } from '../error';

export class MockQueryBus implements QueryBus {
	askSpy = stub<[Query], Either<any, DomainError> | Promise<Either<any, DomainError>>>();

	ask<Q extends Query, R>(query: Q): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		return this.askSpy(query);
	}

	assertAskedQueries(...expectedQueries: Query[]) {
		assert.called(this.askSpy);
		assert.callCount(this.askSpy, expectedQueries.length);
		this.askSpy.getCalls().forEach((c, i) => assert.calledWith(c, expectedQueries[i]));
	}

	assertLastAskedQuery(expectedQuery: Query) {
		assert.called(this.askSpy);
		const lastSpyCall = this.askSpy.lastCall;
		assert.calledWith(lastSpyCall, expectedQuery);
	}

	assertNotAskedQuery() {
		assert.notCalled(this.askSpy);
	}
}
