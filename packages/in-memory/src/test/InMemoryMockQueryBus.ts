import { DomainError, Either, Query } from '@hexadrop/core';
import { assert, stub } from 'sinon';
import { InMemoryQueryBus } from '../infraestructure';

export class InMemoryMockQueryBus extends InMemoryQueryBus {
	askSpy = stub<[Query], Either<any, DomainError> | Promise<Either<any, DomainError>>>();

	async ask<Q extends Query, R>(query: Q): Promise<Either<R, DomainError>> {
		await this.askSpy(query);
		return super.ask(query);
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
