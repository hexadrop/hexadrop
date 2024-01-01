import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

interface QueryConstructorParams {
	readonly queryId?: Nullable<string>;
}

type QueryResponse<ResponseType> = Class<any[], ResponseType>;

abstract class Query<ResponseType = unknown> {
	static QUERY_NAME: string;
	readonly queryId: string;
	readonly queryName: string;

	protected constructor(queryName: string, { queryId }: QueryConstructorParams) {
		this.queryId = queryId ?? crypto.randomUUID();
		this.queryName = queryName;
	}

	abstract get response(): QueryResponse<ResponseType>;
}

type QueryParams<ResponseType, QueryType extends Query<ResponseType>> = Omit<
	Primitives<QueryType>,
	'queryId' | 'queryName'
> &
	Partial<Pick<QueryType, 'queryId'>>;

type QueryClass<
	ResponseType,
	DomainInstanceType extends Query<ResponseType> = Query<ResponseType>,
	CtorArgs extends any[] = [QueryParams<ResponseType, DomainInstanceType>],
> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		QUERY_NAME: string;
	}
>;

export type { QueryClass, QueryParams, QueryResponse };

export default Query;
