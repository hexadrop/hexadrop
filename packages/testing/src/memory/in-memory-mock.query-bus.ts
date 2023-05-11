import { Query } from '@hexadrop/bus';
import { InMemoryQueryBus, QueryHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { SinonStub } from 'sinon';
import { assert, stub } from 'sinon';

export class InMemoryMockQueryBus extends InMemoryQueryBus {
	readonly askSpy: SinonStub<
		[Query<unknown>],
		Either<any, DomainError> | Promise<Either<any, DomainError>>
	>;

	constructor(info?: QueryHandlersInformation) {
		super(info);
		this.askSpy = stub<
			[Query<unknown>],
			Either<void, DomainError> | Promise<Either<void, DomainError>>
		>();
	}

	private static getDataFromQuery(Query: Query<unknown>) {
		const { queryId: _q, ...attributes } = Query;

		return attributes;
	}

	override async ask<R, Q extends Query<R>>(query: Q): Promise<Either<R, DomainError>> {
		await this.askSpy(query);

		return super.ask(query);
	}

	askRejects(error: Error): void {
		this.askSpy.rejects(error);
	}

	askResolve(value: Either<any, DomainError>): void {
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
			eventsArr.map(e => InMemoryMockQueryBus.getDataFromQuery(e)),
			expectedQueries.map(e => InMemoryMockQueryBus.getDataFromQuery(e))
		);
	}

	assertLastAskedQuery(expectedQuery: Query<unknown>): void {
		assert.called(this.askSpy);
		const lastSpyCall = this.askSpy.lastCall;
		const eventsArr = lastSpyCall.args;
		assert.match(
			InMemoryMockQueryBus.getDataFromQuery(eventsArr[0]),
			InMemoryMockQueryBus.getDataFromQuery(expectedQuery)
		);
	}

	assertNotAskedQuery(): void {
		assert.notCalled(this.askSpy);
	}
}
