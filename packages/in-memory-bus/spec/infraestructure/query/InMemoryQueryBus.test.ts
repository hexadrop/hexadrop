import { DomainError, Either, Query, QueryClass, QueryHandler } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';

import { InMemoryQueryBus, QueryHandlersInformation } from '../../../src';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[], Either<string, DomainError>>(() => Either.left('Hello'));
const handler2Spy = vi.fn<[], Either<string, DomainError>>(() => Either.right(new CustomError()));

class Query1 extends Query {
	static readonly QUERY_NAME = 'Query1';

	constructor() {
		super(Query1.QUERY_NAME);
	}
}

class Query1Handler implements QueryHandler<Query1, string> {
	handle(): Either<string, DomainError> {
		return handler1Spy();
	}

	subscribedTo(): QueryClass<Query1> {
		return Query1;
	}
}

class Query2 extends Query {
	static readonly QUERY_NAME = 'Query2';

	constructor() {
		super(Query2.QUERY_NAME);
	}
}

class Query2Handler implements QueryHandler<Query2, string> {
	handle(): Either<string, DomainError> {
		return handler2Spy();
	}

	subscribedTo(): QueryClass<Query2> {
		return Query2;
	}
}

describe('InMemoryQueryBus', () => {
	test('should works as expected', async () => {
		const query1 = new Query1();
		const query2 = new Query2();
		const handler1 = new Query1Handler();
		const handler2 = new Query2Handler();
		const info = new QueryHandlersInformation(handler1, handler2);
		const bus = new InMemoryQueryBus(info);

		const either1 = await bus.ask(query1);

		expect(handler1Spy).toHaveBeenCalledOnce();
		expect(either1).toBeDefined();
		expect(either1.isLeft()).toBeTruthy();
		expect(either1.getLeft()).toBe('Hello');

		const either2 = await bus.ask(query2);

		expect(handler2Spy).toHaveBeenCalledOnce();
		expect(either2).toBeDefined();
		expect(either2.isRight()).toBeTruthy();
		expect(either2.getRight().message).toBe('msg');
		expect(either2.getRight().name).toBe('CustomError');
	});
});
