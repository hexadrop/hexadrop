import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import { expect, vi } from 'vitest';

import type QueryBus from './bus';
import type Query from './query';

/**
 * @class VitestMockQueryBus
 * @implements QueryBus
 * @description Class representing a mock query bus for testing in Vitest.
 */
export default class VitestMockQueryBus implements QueryBus {
	/**
	 * @property {Mock} askSpy - A mock function for the ask method.
	 */
	readonly askSpy = vi.fn(
		<const ResponseType>(_query: Query<ResponseType>) => Promise.resolve(Either.right<DomainError>()),
	);

	/**
	 * This is a private static method that extracts data from a query.
	 * It omits the 'queryId' property from the query object and returns the remaining properties.
	 * If no query is provided, it returns an empty object.
	 *
	 * @template QueryType - A type that extends the Query interface.
	 * @param {QueryType} query - The query object from which to extract data. This is optional.
	 * @returns {Omit<QueryType, 'queryId'> | {}} - An object that contains the properties of the query object, excluding 'queryId'. If no query is provided, an empty object is returned.
	 */
	private static getDataFromQuery<Response, QueryType extends Query<Response>>(
		query?: QueryType,
	): Omit<QueryType, 'queryId'> | Record<string, never> {
		if (!query) {
			return {};
		}
		const { queryId, ...attributes } = query;

		return attributes as Omit<QueryType, 'queryId'>;
	}

	/**
	 * @method ask
	 * @description A method that takes a Query and returns either a DomainError or the ResponseType type, or a Promise of that either
	 * @param {Query<ResponseType>} query - The Query to be asked
	 * @returns {Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>} - Either a DomainError or the ResponseType type, or a Promise of either
	 * @template ResponseType - The type of the ResponseType
	 */
	ask<const ResponseType>(query: Query<ResponseType>):
		Either<DomainError, ResponseType> |
		Promise<Either<DomainError, ResponseType>> {
		return this.askSpy(query);
	}

	/**
	 * @method assertAskedQueries
	 * @description Method to assert that specific queries were asked.
	 * @param {...Query[]} expectedQueries - The expected asked queries.
	 */
	assertAskedQueries(...expectedQueries: Query<unknown>[]): void {
		expect(this.askSpy).toHaveBeenCalled();
		const queriesArray = this.askSpy.mock.calls.flat();
		expect(queriesArray.length).toEqual(expectedQueries.length);
		expect(queriesArray.map(query => VitestMockQueryBus.getDataFromQuery(query))).toStrictEqual(
			expectedQueries.map(query => VitestMockQueryBus.getDataFromQuery(query)),
		);
	}

	/**
	 * @method assertLastAskedQuery
	 * @description Method to assert that a specific query was the last one asked.
	 * @param {Query} expectedQuery - The expected last asked query.
	 */
	assertLastAskedQuery<Response>(expectedQuery: Query<Response>): void {
		expect(this.askSpy).toHaveBeenCalled();
		const queriesArray = this.askSpy.mock.calls.at(-1) ?? [];
		const query = queriesArray[0];
		expect(query).toBeDefined();
		expect(VitestMockQueryBus.getDataFromQuery(query)).toStrictEqual(
			VitestMockQueryBus.getDataFromQuery(expectedQuery),
		);
	}

	/**
	 * @method assertNotAskedQuery
	 * @description Method to assert that no query was asked.
	 */
	assertNotAskedQuery(): void {
		expect(this.askSpy).not.toHaveBeenCalled();
	}
}
