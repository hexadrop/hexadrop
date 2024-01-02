import '@abraham/reflection';

import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { describe, expect, jest, test } from 'bun:test';

import type { QueryHandler } from './bus';
import Decorator from './decorator';
import Query from './query';

class Query1Response {
	constructor(readonly foo: string) {}
}

class Query1 extends Query<Query1Response> {
	static override QUERY_NAME = 'Query1';

	constructor(readonly foo: string) {
		super(Query1.QUERY_NAME, 'id');
	}

	override get response(): typeof Query1Response {
		return Query1Response;
	}
}

const handler1Spy = jest.fn((_query: Query1) => Either.right<DomainError, Query1Response>(new Query1Response('1')));

class Query1Handler implements QueryHandler<Query1Response, Query1> {
	run(query: Query1): Either<DomainError, Query1Response> {
		return handler1Spy(query);
	}
}

class Query2Handler {
	booz(query: Query1): Either<DomainError, Query1Response> {
		return handler1Spy(query);
	}
}

describe('@QueryHandler()', () => {
	test('should decorate a query handler', () => {
		const target = Decorator(Query1)(Query1Handler);
		expect(target).toBe(Query1Handler);
		const handler = Reflect.getMetadata('query-handler', Query1);
		expect(handler).toStrictEqual(Query1Handler);
	});
	test('should throw an exception if query handler has `run()` method', () => {
		const expectedError = new Error('QueryHandler must implements a `run()` method');
		expect(() => Decorator(Query1)(Query2Handler)).toThrow(expectedError);
	});
});
