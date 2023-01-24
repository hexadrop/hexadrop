import { DomainError, Either, Query, QueryClass, QueryHandler } from '@hexadrop/core';
import { describe, expect, test } from 'vitest';

import { QueryHandlersInformation, QueryNotRegisteredError } from '../../../src';

class Query1 extends Query {
	static readonly QUERY_NAME = 'Query1';

	constructor() {
		super(Query1.QUERY_NAME);
	}
}

class Query2 extends Query {
	static readonly QUERY_NAME = 'Query2';

	constructor() {
		super(Query2.QUERY_NAME);
	}
}

class Query4 extends Query {
	static readonly QUERY_NAME = 'Query4';

	constructor() {
		super(Query4.QUERY_NAME);
	}
}

class Query5 extends Query {
	static readonly QUERY_NAME = 'Query5';

	constructor() {
		super(Query5.QUERY_NAME);
	}
}

class Query1Handler implements QueryHandler<Query1, void> {
	async handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): QueryClass<Query1> {
		return Query1;
	}
}

class Query2Handler implements QueryHandler<Query2, void> {
	async handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): QueryClass<Query2> {
		return Query2;
	}
}

class Query4Handler implements QueryHandler<Query4, void> {
	async handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): QueryClass<Query4> {
		return Query4;
	}
}

class Query5Handler implements QueryHandler<Query5, void> {
	async handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): QueryClass<Query5> {
		return Query5;
	}
}

describe('QueryHandlersInformation', () => {
	test('should works as expected', () => {
		const c1 = new Query1();
		const c2 = new Query2();
		const c4 = new Query4();
		const c5 = new Query5();

		const expectedQuery1Handler = new Query1Handler();
		const expectedQuery23Handler = new Query2Handler();
		const expectedQuery4Handler = new Query4Handler();
		const expectedQuery56Handler = new Query5Handler();

		const info = new QueryHandlersInformation(expectedQuery1Handler, expectedQuery23Handler);

		const h1 = info.search(c1);
		expect(h1).toBeDefined();
		expect(h1).toBeInstanceOf(Query1Handler);

		const h2 = info.search(c2);
		expect(h2).toBeDefined();
		expect(h2).toBeInstanceOf(Query2Handler);

		const fn = () => info.search(c4);
		expect(fn).toThrow(QueryNotRegisteredError);
		expect(fn).toThrow(`The query 'Query4' hasn't a query handler associated`);

		info.addQueryHandler(expectedQuery4Handler);
		info.addQueryHandler(expectedQuery56Handler);

		const h4 = info.search(c4);
		expect(h4).toBeDefined();
		expect(h4).toBeInstanceOf(Query4Handler);

		const h5 = info.search(c5);
		expect(h5).toBeDefined();
		expect(h5).toBeInstanceOf(Query5Handler);
	});
});
