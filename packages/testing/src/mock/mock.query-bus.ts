import type { Handler, QueryBus, QueryBusCallback, QueryClass } from '@hexadrop/bus';
import { Query } from '@hexadrop/bus';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { SinonStub } from 'sinon';
import { assert, stub } from 'sinon';

export class MockQueryBus implements QueryBus {
	readonly askSpy: SinonStub<
		[Query<any>],
		Either<any, DomainError> | Promise<Either<any, DomainError>>
	>;

	readonly registerSpy: SinonStub<
		[QueryClass<unknown, any>, Handler<any> | QueryBusCallback<unknown, any>],
		void
	>;

	readonly unregisterSpy: SinonStub<[QueryClass<unknown, any>], void>;

	constructor() {
		this.askSpy = stub<
			[Query<any>],
			Either<any, DomainError> | Promise<Either<any, DomainError>>
		>();
		this.registerSpy = stub<
			[QueryClass<unknown, any>, Handler<any> | QueryBusCallback<unknown, any>],
			void
		>();
		this.unregisterSpy = stub<[QueryClass<unknown, any>], void>();
	}

	private static getDataFromQuery<R, Q extends Query<R>>(query: Q) {
		const { queryId: _q, ...attributes } = query;

		return attributes;
	}

	ask<R>(query: Query<R>): Either<R, DomainError> | Promise<Either<R, DomainError>> {
		return this.askSpy(query);
	}

	askRejects(error: Error): void {
		this.askSpy.rejects(error);
	}

	askResolve(value: Either<unknown, DomainError>): void {
		this.askSpy.resolves(value);
	}

	assertAskedQueries(...expectedQueries: Query<unknown>[]): void {
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

	assertLastAskedQuery(expectedQuery: Query<unknown>): void {
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

	register<R, C extends Query<R>>(
		query: QueryClass<R, C>,
		callback: Handler<C> | QueryBusCallback<R, C>
	): void {
		this.registerSpy(query, callback);
	}

	unregister<R, C extends Query<R>>(query: QueryClass<R, C>): void {
		this.unregisterSpy(query);
	}
}
