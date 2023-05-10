import type { Clazz } from '@hexadrop/core';

import { IdentifierValueObject } from '../value-object';

export abstract class Query<Response> {
	static QUERY_NAME: string;
	readonly queryId: string;
	readonly queryName: string;
	readonly relatedId: string | undefined;

	protected constructor(queryName: string, queryId?: string, relatedId?: string) {
		this.queryId = queryId ?? IdentifierValueObject.random();
		this.queryName = queryName;
		this.relatedId = relatedId;
	}

	abstract get response(): Clazz<Response>;
}

export type QueryClass<Response, Q extends Query<Response>> = Clazz<Q> & {
	QUERY_NAME: string;
};
