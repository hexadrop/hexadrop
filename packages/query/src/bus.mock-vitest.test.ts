import { describe, expect, test } from 'bun:test';

import VitestMockQueryBus from './bus.mock-vitest';
import Query from './query';

class Query1Response {
	constructor(public readonly foo: string) {}
}

class Query1 extends Query<Query1Response> {
	static override QUERY_NAME = 'Query1';

	constructor(id: string) {
		super(Query1.QUERY_NAME, id);
	}

	get response(): typeof Query1Response {
		return Query1Response;
	}
}

class Query2Response {
	constructor(public readonly bar: string) {}
}

class Query2 extends Query<Query2Response> {
	static override QUERY_NAME = 'Query2';

	constructor(id: string) {
		super(Query2.QUERY_NAME, id);
	}

	get response(): typeof Query2Response {
		return Query2Response;
	}
}

describe('VitestMockQueryBus', () => {
	describe('assertAskedQueries()', () => {
		test('should works as expected', async () => {
			const query1 = new Query1('1');
			const query2 = new Query2('2');
			const bus = new VitestMockQueryBus();

			await bus.ask(query1);
			await bus.ask(query2);

			expect(() => bus.assertLastAskedQuery(query1)).toThrow();
			expect(() => bus.assertAskedQueries(query1, query2)).not.toThrow();
		});
	});
	describe('assertLastAskedQuery()', () => {
		test('should works as expected', async () => {
			const query1 = new Query1('1');
			const query2 = new Query2('2');
			const bus = new VitestMockQueryBus();

			await bus.ask(query1);
			await bus.ask(query2);

			expect(() => bus.assertLastAskedQuery(query1)).toThrow();
			expect(() => bus.assertLastAskedQuery(query2)).not.toThrow();
		});
	});
	describe('assertNotAskedQuery()', () => {
		test('should works as expected', async () => {
			const query1 = new Query1('1');
			const query2 = new Query2('2');
			const bus = new VitestMockQueryBus();

			expect(() => bus.assertNotAskedQuery()).not.toThrow();

			await bus.ask(query1);
			await bus.ask(query2);

			expect(() => bus.assertNotAskedQuery()).toThrow();
		});
	});
});
