import { describe, expect, test } from 'vitest';

import { Query } from '../../src';

class MockQuery extends Query {
	static QUERY_NAME = 'query';

	constructor(queryId?: string, relatedId?: string) {
		super(MockQuery.QUERY_NAME, queryId, relatedId);
	}
}

describe('Query', () => {
	test('should instantiate', () => {
		const query = new MockQuery();
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBeDefined();
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with id', () => {
		const query = new MockQuery('id');
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with relatedId', () => {
		const query = new MockQuery(undefined, 'relatedId');
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBeDefined();
		expect(query.relatedId).toBe('relatedId');
	});
});
