import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

/**
 * Interface for the parameters of the Query constructor
 * @interface
 * @property {Nullable<string>} queryId - An optional unique identifier for the Query
 */
interface QueryConstructorParams {
	readonly queryId?: Nullable<string>;
}

/**
 * Type alias for the response of a Query
 * @typedef {Class<any[], ResponseType>} QueryResponse
 * @template ResponseType - The type of the response
 */
type QueryResponse<ResponseType> = Class<any[], ResponseType>;

/**
 * Abstract class representing a Query
 * @abstract
 * @template ResponseType - The type of the response
 * @property {string} QUERY_NAME - Static property for the name of the Query
 * @property {string} queryId - Unique identifier for the Query
 * @property {string} queryName - Name of the Query
 */
abstract class Query<ResponseType = unknown> {
	static QUERY_NAME: string;
	readonly queryId: string;
	readonly queryName: string;

	/**
	 * Constructs a new instance of the Query class.
	 *
	 * @param queryName - The name of the query.
	 * @param params - An optional object containing additional parameters for the query.
	 * @property queryId - The ID of the query. If not provided in the params, a random UUID will be generated.
	 * @property queryName - The name of the query, as provided in the queryName parameter.
	 */
	protected constructor(queryName: string, params?: QueryConstructorParams) {
		const { queryId } = params ?? {};
		this.queryId = queryId ?? crypto.randomUUID();
		this.queryName = queryName;
	}

	/**
	 * Abstract getter for the response of the Query
	 * @abstract
	 * @type {QueryResponse<ResponseType>}
	 */
	abstract get response(): QueryResponse<ResponseType>;
}

/**
 * Type alias for the parameters of a Query
 * @typedef {Omit<Primitives<QueryType>, 'queryId' | 'queryName'> & Partial<Pick<QueryType, 'queryId'>>} QueryParams
 * @template ResponseType - The type of the response
 * @template QueryType - The type of the Query that extends Query<ResponseType>
 */
type QueryParams<ResponseType, QueryType extends Query<ResponseType>> = Omit<
	Primitives<QueryType>,
	'queryId' | 'queryName'
> &
	Partial<Pick<QueryType, 'queryId'>>;

/**
 * Type alias for a Query class
 * @typedef {Class<CtorArgs, DomainInstanceType, { QUERY_NAME: string; }>} QueryClass
 * @template ResponseType - The type of the response
 * @template DomainInstanceType - The type of the Query that extends Query<ResponseType>
 * @template CtorArgs - The type of the constructor arguments, defaults to an array of QueryParams<ResponseType, DomainInstanceType>
 */
type QueryClass<
	ResponseType,
	DomainInstanceType extends Query<ResponseType> = Query<ResponseType>,
	CtorArgs extends any[] = [QueryParams<ResponseType, DomainInstanceType>?],
> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		QUERY_NAME: string;
	}
>;

export type { QueryClass, QueryParams, QueryResponse };

export default Query;
