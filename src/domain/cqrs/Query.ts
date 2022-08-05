import { IdentifierValueObject } from '../value-object';

export abstract class Query<T = unknown> {
	static QUERY_NAME: string;
	readonly queryId: string;
	readonly queryName: string;
	readonly relatedId?: string;

	protected constructor(queryName: string, queryId?: string, relatedId?: string) {
		this.queryId = queryId || IdentifierValueObject.random().value;
		this.queryName = queryName;
		this.relatedId = relatedId;
	}
}

export type QueryClass<D extends Query> = {
	QUERY_NAME: string;
	new (...args: unknown[]): D;
};
