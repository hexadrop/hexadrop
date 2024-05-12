import { describe, expect, test } from 'bun:test';

import Query from './query';

class Query1Response {
	constructor(readonly foo: string) {}
}
class MockQuery1 extends Query<Query1Response> {
	static override QUERY_NAME = 'query';

	constructor(
		readonly foo: string,
		queryId?: string
	) {
		super(MockQuery1.QUERY_NAME, queryId);
	}

	override get response(): typeof Query1Response {
		return Query1Response;
	}
}

describe('Query', () => {
	describe('constructor()', () => {
		test('should instantiate with query id', () => {
			const query = new MockQuery1('foo', 'queryId');
			expect(query.queryName).toBe('query');
			expect(query.queryId).toBe('queryId');
			expect(query.foo).toBe('foo');
			expect(Object.getPrototypeOf(query)).toStrictEqual(MockQuery1.prototype);
			expect(query.constructor).toStrictEqual(MockQuery1);
		});
		test('should instantiate without query id', () => {
			const query = new MockQuery1('foo');
			expect(query.queryName).toBe('query');
			expect(query.queryId).toBeDefined();
			expect(query.foo).toBe('foo');
			expect(Object.getPrototypeOf(query)).toStrictEqual(MockQuery1.prototype);
			expect(query.constructor).toStrictEqual(MockQuery1);
		});
	});
});
