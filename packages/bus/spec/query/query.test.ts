import { Query } from '@hexadrop/bus';
import type { Clazz } from '@hexadrop/types';
import { describe, expect, test } from 'vitest';

class Response {
	constructor(readonly value: string) {}
}

class MockQuery extends Query<Response> {
	static override QUERY_NAME = 'query';

	constructor(queryId: string, relatedId?: string) {
		super(MockQuery.QUERY_NAME, queryId, relatedId);
	}

	get response(): Clazz<Response> {
		return Response;
	}
}

describe('Query', () => {
	test('should instantiate', () => {
		const query = new MockQuery('id');
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with id', () => {
		const query = new MockQuery('id');
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with relatedId', () => {
		const query = new MockQuery('id', 'relatedId');
		expect(query.queryName).toBe('query');
		expect(query.queryId).toBe('id');
		expect(query.relatedId).toBe('relatedId');
	});
});
