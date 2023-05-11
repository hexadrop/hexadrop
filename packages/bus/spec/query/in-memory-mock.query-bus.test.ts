import type { Handler, QueryBusCallback } from '@hexadrop/bus';
import { Query } from '@hexadrop/bus';
import { QueryHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import { InMemoryMockQueryBus } from '@hexadrop/testing';
import type { Clazz } from '@hexadrop/types';
import { describe, expect, test } from 'vitest';

class Query1Response {
	constructor(readonly foo: string) {}
}

class Query1 extends Query<Query1Response> {
	static override QUERY_NAME = 'Query1';

	constructor() {
		super(Query1.QUERY_NAME, 'id');
	}

	get response(): Clazz<Query1Response> {
		return Query1Response;
	}
}

class Query1Handler implements Handler<Query1> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Query2Response {
	constructor(readonly bar: string) {}
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

class Query2Handler implements Handler<Query2> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

describe('InMemoryMockQueryBus', () => {
	test('should assertLastPublishedQuery works as expected', async () => {
		const query1 = new Query1();
		const query2 = new Query2();
		const handler1 = new Query1Handler();
		const handler2 = new Query2Handler();
		const map = new Map<string, QueryBusCallback>();
		map.set(Query1.QUERY_NAME, handler1.run.bind(handler1));
		map.set(Query2.QUERY_NAME, handler2.run.bind(handler2));
		const info = new QueryHandlersInformation(map);
		const bus = new InMemoryMockQueryBus(info);

		await bus.ask(query1);
		await bus.ask(query2);

		expect(() => bus.assertLastAskedQuery(query1)).toThrow();
		expect(() => bus.assertLastAskedQuery(query2)).not.toThrow();
	});
	test('should assertLastPublishedQuery works as expected', async () => {
		const query1 = new Query1();
		const query2 = new Query2();
		const handler1 = new Query1Handler();
		const handler2 = new Query2Handler();
		const map = new Map<string, QueryBusCallback>();
		map.set(Query1.QUERY_NAME, handler1.run.bind(handler1));
		map.set(Query2.QUERY_NAME, handler2.run.bind(handler2));
		const info = new QueryHandlersInformation(map);
		const bus = new InMemoryMockQueryBus(info);

		await bus.ask(query1);
		await bus.ask(query2);

		expect(() => bus.assertAskedQueries(query1)).toThrow();
		expect(() => bus.assertAskedQueries(query1, query2)).not.toThrow();
	});
	test('should assertNotPublishedQuery works as expected', async () => {
		const query1 = new Query1();
		const query2 = new Query2();
		const handler1 = new Query1Handler();
		const handler2 = new Query2Handler();
		const map = new Map<string, QueryBusCallback>();
		map.set(Query1.QUERY_NAME, handler1.run.bind(handler1));
		map.set(Query2.QUERY_NAME, handler2.run.bind(handler2));
		const info = new QueryHandlersInformation(map);
		const bus = new InMemoryMockQueryBus(info);

		expect(() => bus.assertNotAskedQuery()).not.toThrow();

		await bus.ask(query1);
		await bus.ask(query2);

		expect(() => bus.assertNotAskedQuery()).toThrow();
	});
});
