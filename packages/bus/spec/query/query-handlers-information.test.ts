import type { Handler, QueryBusCallback } from '@hexadrop/bus';
import { Query } from '@hexadrop/bus';
import { QueryHandlersInformation, QueryNotRegisteredError } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
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

class Query4Response {
	constructor(readonly baz: string) {}
}

class Query4 extends Query<Query4Response> {
	static override QUERY_NAME = 'Query4';

	constructor() {
		super(Query4.QUERY_NAME, 'id');
	}

	get response(): Clazz<Query4Response> {
		return Query4Response;
	}
}

class Query5Response {
	constructor(readonly vit: string) {}
}

class Query5 extends Query<Query5Response> {
	static override QUERY_NAME = 'Query5';

	constructor() {
		super(Query5.QUERY_NAME, 'id');
	}

	get response(): Clazz<Query5Response> {
		return Query5Response;
	}
}

class Service {
	hello(): string {
		return 'world';
	}
}

class Query1Handler implements Handler<Query1> {
	constructor(private readonly svc: Service) {}

	async run(): Promise<Either<void, DomainError>> {
		this.svc.hello();

		return Promise.resolve(Either.left(undefined));
	}
}

class Query2Handler implements Handler<Query2> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Query4Handler implements Handler<Query4> {
	constructor(private readonly svc: Service) {}

	async run(): Promise<Either<void, DomainError>> {
		this.svc.hello();

		return Promise.resolve(Either.left(undefined));
	}
}

class Query5Handler implements Handler<Query5> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

describe('QueryHandlersInformation', () => {
	test('should works as expected', () => {
		const c1 = new Query1();
		const c2 = new Query2();
		const c4 = new Query4();
		const c5 = new Query5();

		const s = new Service();

		const expectedQuery1Handler = new Query1Handler(s);
		const expectedQuery23Handler = new Query2Handler();
		const expectedQuery4Handler = new Query4Handler(s);
		const expectedQuery56Handler = new Query5Handler();

		const map = new Map<string, QueryBusCallback>();
		map.set(Query1.QUERY_NAME, expectedQuery1Handler.run);
		map.set(Query2.QUERY_NAME, expectedQuery23Handler.run);
		const info = new QueryHandlersInformation(map);

		const h1 = info.search(c1);
		expect(h1).toBeDefined();
		expect(h1).toStrictEqual(expectedQuery1Handler.run);

		const h2 = info.search(c2);
		expect(h2).toBeDefined();
		expect(h2).toStrictEqual(expectedQuery23Handler.run);

		const fn = () => info.search(c4);
		expect(fn).toThrow(QueryNotRegisteredError);
		expect(fn).toThrow(`The query 'Query4' hasn't a query handler associated`);

		info.register(Query4, expectedQuery4Handler);
		info.register(Query5, expectedQuery56Handler);

		const h4 = info.search(c4);
		expect(h4).toBeDefined();
		// expect(h4).toStrictEqual(expectedQuery4Handler.run);

		const h5 = info.search(c5);
		expect(h5).toBeDefined();
		// expect(h5).toStrictEqual(expectedQuery56Handler.run);
	});
});
