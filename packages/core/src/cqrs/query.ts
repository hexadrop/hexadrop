import { IdentifierValueObject } from '../value-object';

export abstract class Query {
	readonly queryId: string;
	readonly queryName: string;
	readonly relatedId: string | undefined;

	protected constructor(queryName: string, queryId?: string, relatedId?: string) {
		this.queryId = queryId ?? IdentifierValueObject.random();
		this.queryName = queryName;
		this.relatedId = relatedId;
	}
}

export type QueryClass<D extends Query> = {
	QUERY_NAME: string;
	new (...args: any[]): D;
};
