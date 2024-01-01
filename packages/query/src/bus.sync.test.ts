import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { beforeEach, describe, expect, jest, test } from 'bun:test';

import type { QueryHandler } from './bus';
import SyncQueryBus from './bus.sync';
import InMemoryQueryHandlers from './in-memory.query-handlers';
import type { QueryResponse } from './query';
import Query from './query';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

class Query1Response {
	constructor(readonly foo: string) {}
}

class Query2Response {
	constructor(readonly bar: string) {}
}

const handler1Spy = jest.fn(() => Either.right<DomainError, Query1Response>(new Query1Response('1')));
const handler2Spy = jest.fn(() => Either.left<DomainError, Query2Response>(new CustomError()));

class Query1 extends Query<Query1Response> {
	static override QUERY_NAME = 'Query1';

	constructor() {
		super(Query1.QUERY_NAME, { queryId: 'id' });
	}

	get response(): QueryResponse<Query1Response> {
		return Query1Response;
	}
}

class Query1Handler implements QueryHandler<Query1Response, Query1> {
	run(): Either<DomainError, Query1Response> {
		return handler1Spy();
	}
}

class Query2 extends Query<Query2Response> {
	static override QUERY_NAME = 'Query2';

	constructor() {
		super(Query2.QUERY_NAME, { queryId: 'id' });
	}

	get response(): QueryResponse<Query2Response> {
		return Query2Response;
	}
}

class Query2Handler implements QueryHandler<Query2Response, Query2> {
	run(): Either<DomainError, Query2Response> {
		return handler2Spy();
	}
}

describe('SyncQueryBus', () => {
	let query1: Query;
	let query2: Query;
	let handler1: QueryHandler<Query1Response, Query1>;
	let handler2: QueryHandler<Query2Response, Query2>;
	let info: InMemoryQueryHandlers;
	let bus: SyncQueryBus;

	beforeEach(() => {
		query1 = new Query1();
		query2 = new Query2();
		handler1 = new Query1Handler();
		handler2 = new Query2Handler();

		info = new InMemoryQueryHandlers();
		info.register(Query1, handler1);
		info.register(Query2, handler2);

		bus = new SyncQueryBus(info);
	});

	describe('dispatch()', () => {
		test('should works as expected', async () => {
			const either1 = await bus.ask(query1);

			expect(handler1Spy).toHaveBeenCalledTimes(1);
			expect(either1).toBeDefined();
			expect(either1.isRight()).toBeTruthy();
			expect(either1.getRight()).toStrictEqual(new Query1Response('1'));

			const either2 = await bus.ask(query2);

			expect(handler2Spy).toHaveBeenCalledTimes(1);
			expect(either2).toBeDefined();
			expect(either2.isLeft()).toBeTruthy();
			expect(either2.getLeft().message).toBe('msg');
			expect(either2.getLeft().name).toBe('CustomError');
		});
	});
});
