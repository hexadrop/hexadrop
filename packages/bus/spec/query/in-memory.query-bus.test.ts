import type { Handler, QueryBusCallback } from '@hexadrop/bus';
import { Query } from '@hexadrop/bus';
import { InMemoryQueryBus, QueryHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { Clazz } from '@hexadrop/types';
import { describe, expect, test, vi } from 'vitest';

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

const handler1Spy = vi.fn<[], Either<Query1Response, DomainError>>(() =>
	Either.left(new Query1Response('1'))
);
const handler2Spy = vi.fn<[], Either<Query2Response, DomainError>>(() =>
	Either.right(new CustomError())
);

class Query1 extends Query<Query1Response> {
	static override QUERY_NAME = 'Query1';

	constructor() {
		super(Query1.QUERY_NAME, 'id');
	}

	get response(): Clazz<Query1Response> {
		return Query1Response;
	}
}

class Query1Handler implements Handler<Query1, Query1Response> {
	run(): Either<Query1Response, DomainError> {
		return handler1Spy();
	}
}

class Query2 extends Query<Query2Response> {
	static override QUERY_NAME = 'Query2';

	constructor() {
		super(Query2.QUERY_NAME, 'id');
	}

	get response(): Clazz<Query2Response> {
		return Query2Response;
	}
}

class Query2Handler implements Handler<Query2, Query2Response> {
	run(): Either<Query2Response, DomainError> {
		return handler2Spy();
	}
}

describe('InMemoryQueryBus', () => {
	test('should works as expected', async () => {
		const query1 = new Query1();
		const query2 = new Query2();
		const handler1 = new Query1Handler();
		const handler2 = new Query2Handler();

		const map = new Map<string, QueryBusCallback>();
		map.set(Query1.QUERY_NAME, handler1.run.bind(handler1));
		map.set(Query2.QUERY_NAME, handler2.run.bind(handler2));
		const info = new QueryHandlersInformation(map);
		const bus = new InMemoryQueryBus(info);

		const either1 = await bus.ask(query1);

		expect(handler1Spy).toHaveBeenCalledOnce();
		expect(either1).toBeDefined();
		expect(either1.isLeft()).toBeTruthy();
		expect(either1.getLeft()).toStrictEqual(new Query1Response('1'));

		const either2 = await bus.ask(query2);

		expect(handler2Spy).toHaveBeenCalledOnce();
		expect(either2).toBeDefined();
		expect(either2.isRight()).toBeTruthy();
		expect(either2.getRight().message).toBe('msg');
		expect(either2.getRight().name).toBe('CustomError');
	});
});
