import { DomainError, Either, Query } from '@hexadrop/core';
import { expect, vi } from 'vitest';
import { InMemoryQueryBus } from '../infraestructure';

export class InMemoryMockQueryBus extends InMemoryQueryBus {
	askSpy = vi.fn();

	async ask<Q extends Query, R>(query: Q): Promise<Either<R, DomainError>> {
		await this.askSpy(query);
		return super.ask(query);
	}

	assertAskedQueries(...expectedQueries: Query[]) {
		const spyCalls = this.askSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastAskedQueries = spyCalls.map(call => call[0]) as Query[];

		expect(expectedQueries).toMatchObject(lastAskedQueries);
	}

	assertLastAskedQuery(expectedQuery: Query) {
		const spyCalls = this.askSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastSpyCall = spyCalls[spyCalls.length - 1];
		const lastQuery = lastSpyCall[0];

		expect(expectedQuery).toMatchObject(lastQuery);
	}

	assertNotAskedQuery() {
		const askSpyCalls = this.askSpy.mock.calls;

		expect(askSpyCalls.length).toBe(0);
	}
}
