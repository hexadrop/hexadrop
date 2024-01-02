import { describe, expect, test } from 'bun:test';

import type { QueryParams } from './query';
import Query from './query';

class Query1Response {
	constructor(readonly foo: string) {}
}
class MockQuery1 extends Query<Query1Response> {
	static override QUERY_NAME = 'query';
	readonly foo: string;

	constructor({ foo, ...params }: QueryParams<Query1Response, MockQuery1>) {
		super(MockQuery1.QUERY_NAME, params);
		this.foo = foo;
	}
}

describe('Query', () => {
	describe('constructor()', () => {
		test('should instantiate with query id', () => {
			const query = new MockQuery1({
				queryId: 'queryId',
				foo: 'foo',
			});
			expect(query.queryName).toBe('query');
			expect(query.queryId).toBe('queryId');
			expect(query.foo).toBe('foo');
			expect(Object.getPrototypeOf(query)).toStrictEqual(MockQuery1.prototype);
			expect(query.constructor).toStrictEqual(MockQuery1);
		});
		test('should instantiate without query id', () => {
			const query = new MockQuery1({
				foo: 'foo',
			});
			expect(query.queryName).toBe('query');
			expect(query.queryId).toBeDefined();
			expect(query.foo).toBe('foo');
			expect(Object.getPrototypeOf(query)).toStrictEqual(MockQuery1.prototype);
			expect(query.constructor).toStrictEqual(MockQuery1);
		});
	});
});
