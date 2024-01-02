import type { Class } from '@hexadrop/types/class';

/**
 * Query is an abstract class that represents a query with a unique id and name.
 * It is meant to be extended by other classes that implement specific queries.
 *
 * @property {string} QUERY_NAME - A static property that should hold the name of the query.
 * @property {string} queryId - The unique identifier of the query instance. If not provided, a random UUID will be generated.
 * @property {string} queryName - The name of the query instance.
 * @template ResponseType - The type of the response that the query handles.
 */
abstract class Query<ResponseType> {
	static QUERY_NAME: string;
	readonly queryId: string;
	readonly queryName: string;

	/**
	 * Constructs a new Query instance.
	 *
	 * @param {string} queryName - The name of the query instance.
	 * @param {string} [queryId] - The unique identifier of the query instance. If not provided, a random UUID will be generated.
	 */
	protected constructor(queryName: string, queryId?: string) {
		this.queryId = queryId ?? crypto.randomUUID();
		this.queryName = queryName;
	}

	abstract get response(): Class<any[], ResponseType>;
}

/**
 * QueryClass is a type that represents a class of a query.
 * It extends the Class type with the constructor arguments, the instance type, and the static properties of the query.
 *
 * @template ResponseType - The type of the response that the query handles.
 * @template QueryInstanceType - The type of the query instance that extends the Query class. Defaults to Query<ResponseType>.
 * @template CtorArgs - The type of the array of constructor arguments. Defaults to any[].
 */
type QueryClass<
	ResponseType,
	QueryInstanceType extends Query<ResponseType> = Query<ResponseType>,
	CtorArgs extends any[] = any[],
> = Class<
	CtorArgs,
	QueryInstanceType,
	{
		QUERY_NAME: string;
	}
>;

export type { QueryClass };

export default Query;
